import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
// import {
//   onCreateTodo,
//   onDeleteTodo,
//   onUpdateTodo,
// } from '../graphql/subscriptions';
import { useServerlessCRUD } from './useServerlessCRUD';

//// TODO 4: Remove these and uncomment the import versions
const onCreateTodo = 'Placeholder, remove me in step 4';
const onDeleteTodo = 'Placeholder, remove me in step 4';
const onUpdateTodo = 'Placeholder, remove me in step 4';

export const useServerlessSubscriptions = () => {
  //// This todos variable is the true replacement of the old one we had in TodoList.
  const [todos, setTodos] = useState([]);
  const [owner, setOwner] = useState('');

  const { getAllTodosServerless } = useServerlessCRUD();

  //// This block is the replacement of the one in TodoList, which fetches all todos from the database.
  useEffect(() => {
    async function getAllTodos() {
      const todos = await getAllTodosServerless();
      setTodos(todos);
    }
    getAllTodos();
  }, []);

  //// To set up subscriptions, we need to fetch the authenticated user information first
  useEffect(() => {
    async function getOwner() {
      const currentUser = await Auth.currentAuthenticatedUser();
      setOwner(currentUser.username);
    }
    if (!owner) getOwner();
  }, [owner]);

  //// This block will set up all the subscriptions for Create, Update and Delete.
  useEffect(() => {
    if (!owner) return;
    console.log({ owner });

    //// The logic in here replaces the logic from the old create() function in TodoList
    const addSubscription = API.graphql(
      graphqlOperation(onCreateTodo, { owner })
    ).subscribe({
      next: (event) => {
        const newTodo = event.value.data.onCreateTodo;
        setTodos((stateTodos) => [newTodo, ...stateTodos]);
      },
      error: (error) => {
        console.error(error);
      },
    });

    //// The logic in here replaces the logic from the old remove() function in TodoList
    const removeSubscription = API.graphql(
      graphqlOperation(onDeleteTodo, { owner })
    ).subscribe({
      next: (event) => {
        const deletedTodo = event.value.data.onDeleteTodo;
        setTodos((stateTodos) =>
          stateTodos.filter((todo) => todo.id !== deletedTodo.id)
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

    //// The logic in here replaces the logic from the old update() function in TodoList
    const updateSubscription = API.graphql(
      graphqlOperation(onUpdateTodo, { owner })
    ).subscribe({
      next: (event) => {
        const updatedTodo = event.value.data.onUpdateTodo;
        setTodos((stateTodos) => {
          return stateTodos.map((todo) => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }
            return todo;
          });
        });
      },
      error: (error) => {
        console.error(error);
      },
    });

    //// When we close the app, this return block will clean up the code for us
    return () => {
      addSubscription.unsubscribe();
      removeSubscription.unsubscribe();
      updateSubscription.unsubscribe();
    };
  }, [owner]);

  //// At the end, we return the todos list back to any component using this hook.
  //// This will replace the const [todos, setTodos] = useState([]) from TodoList.
  //// We don't need setTodos anymore because the GraphQL subscriptions are handling all
  //// updates directly from the database. All we do now, is add stuff to our database
  //// and listen for changes.
  return { todos };
};
