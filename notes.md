# Mutations and Actions - Explanation and Relationship

The SET_TODOS mutation and the fetchTodos action work together to fetch and store todo items in your Vuex store's state. Here's how they are related:

1. SET_TODOS Mutation:

- This mutation is responsible for updating the todos array in your Vuex store's state.
- It takes two parameters: state (the current state of the store) and todos (the new array of todo items to be set in the state).
- When this mutation is committed, it sets the state.todos array to the new todos array that is passed to it.

```javascript
SET_TODOS(state, todos) {
  state.todos = todos;
}
```

2. fetchTodos Action:

- This action is responsible for making an asynchronous HTTP request to fetch todo items from the JSONPlaceholder API.
- It uses the axios.get method to make the request and waits for the response using the await keyword.
- Once the response is received, it commits the SET_TODOS mutation with the fetched data (response.data) as the payload. This is done using the commit method, which is part of the context object passed to the action.
- By committing the SET_TODOS mutation, the action updates the todos array in the state with the fetched data.

```javascript
async fetchTodos({ commit }) {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  commit("SET_TODOS", response.data);
}
```

In summary, the fetchTodos action fetches todo items from an external API and then uses the SET_TODOS mutation to update the todos array in the Vuex store's state with the fetched data. This allows the application to display the latest todo items to the user.


# Installations

Install vuex and axios together:

`npm install vuex@next axios`

Install Bootstrap:

`npm install bootstrap@5.3.0`

Import Bootstrap to main.js:

`import 'bootstrap/dist/css/bootstrap.min.css'`

Import Bootstrap bundle js file to main.js (only if you wish to use components like NavBar, dropdowns etc)
`import 'bootstrap/dist/js/bootstrap.bundle.min.js'`

Install vue toastification:

`npm i vue-toastification@next`

Import vue toastification to main.js:

```javascript
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
app.use(Toast);
```