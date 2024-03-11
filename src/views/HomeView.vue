<template>
  <div>
    <h1>ToDo App</h1>
    <p>Add a to-do item</p>
  </div>
  <div>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";

export default {
  components: {
    TodoList,
  },
};
</script>
