<template>
  <div class="row">
    <div class="col-md-6">
      <input class="form-control" type="text" id="newTodo" v-model="newTodo" />
    </div>
    <div class="col-md-6">
      <button class="btn btn-secondary btn-sm" @click="addTodo">
        Add Todo
      </button>
    </div>
  </div>

  <div class="mt-5">
    <ul class="list-group">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="
          'list-group-item d-flex justify-content-between align-items-center' +
          (todo.completed === true ? ' list-group-item-success' : '')
        "
        @dblclick="toggleTodo(todo.id)"
      >
        {{ todo.title }}
        <button class="btn btn-link btn-sm" @click="deleteTodo(todo.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification"; // Importing useToast function from Vue Toast
import { ref, computed, onMounted } from "vue"; // Importing necessary Composition API functions from Vue
import { useStore } from "vuex"; // Importing useStore function from Vuex to access the store

const toast = useToast(); // Get toast interface
const store = useStore(); // Accessing the Vuex store instance
const newTodo = ref(""); // Creating a reactive reference for the new todo input value

// Fetch todos from the API when the component is mounted
onMounted(() => {
  store.dispatch("fetchTodos");
});

const todos = computed(() => store.state.todos); // Creating a computed property to reactively access the todos from the Vuex store

// Function to add a new todo
const addTodo = () => {
  if (!newTodo.value) {// Checking if the input is empty
    // Display a toast error message if field is empty
    toast.error("Please enter a title for your to-do.");
    return;
  }

  if(store.dispatch("addTodo", newTodo.value.trim())){ // Dispatching an action to add the new todo
    toast.success("Todo added successfully");
    newTodo.value = ""; // Resetting the input field
  }
};

// Function to delete a todo by its id
const deleteTodo = (id) => {
  if(store.dispatch("deleteTodo", id)){ // Dispatching an action to delete the todo
    toast.success("Todo deleted successfully");
  }
};

// Function to toggle the completion status of a todo
const toggleTodo = (id) => {
  store.dispatch("toggleTodo", id);
};
</script>
