import { createStore } from "vuex"; // Importing createStore function from Vuex to create a new store
import axios from "axios"; // Importing axios for making HTTP requests

export default createStore({
  state: {
    todos: [], // Defining the initial state with an empty todos array
  },
  
  mutations: {
    // Mutation to set the todos array with fetched data
    SET_TODOS(state, todos) {
      state.todos = todos;
    },

    // Mutation to add a new todo to the beginning of the todos array
    ADD_TODO(state, todo) {
      state.todos.unshift(todo); // Add the new todo to the beginning of the array. Push adds to the end
    },

    // Mutation to delete a todo by its id
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    // Mutation to toggle a todo by its id
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },    
  },

  actions: {
    // Action to fetch todos from the JSONPlaceholder API
    async fetchTodos({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      commit("SET_TODOS", response.data); // Committing the fetched data to the state using the SET_TODOS mutation
    },

    // Action to add a new todo
    async addTodo({ commit }, title) {
      const newTodo = {
        id: Date.now(), // Assigning a unique ID based on the current timestamp
        title,
        completed: false,
      };
      commit("ADD_TODO", newTodo); // Committing the new todo to the state using the ADD_TODO mutation
    },

    // Action to delete a todo by its id
    async deleteTodo({ commit }, id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit("DELETE_TODO", id); // Committing the deletion to the state using the DELETE_TODO mutation
    },

    // Action to toggle a todo by its id
    toggleTodo({ commit }, id) {
      commit('TOGGLE_TODO', id);
    },

  },
});
