import { API, graphqlOperation } from 'aws-amplify';
// import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations';
// import { listTodos } from '../graphql/queries';
import { useCallback } from 'react';

//// TODO 3: Remove these and uncomment the import versions
const createTodo = 'Placeholder, remove me in step 3';
const deleteTodo = 'Placeholder, remove me in step 3';
const updateTodo = 'Placeholder, remove me in step 3';
const listTodos = 'Placeholder, remove me in step 3';

export const useServerlessCRUD = () => {
  const getAllTodosServerless = useCallback(async () => {
    try {
      const response = await API.graphql(graphqlOperation(listTodos));
      return response.data.listTodos.items;
    } catch (error) {
      console.error(error);
      alert('Something went wrong while fetching all todos');
    }
  }, []);
  const createServerless = async (newTodo) => {
    const { id, completed, task } = newTodo;
    try {
      const response = await API.graphql(
        graphqlOperation(createTodo, {
          input: { id, completed, task },
        })
      );
      return response.data.createTodo;
    } catch (error) {
      console.error(error);
      alert('Something went wrong while adding a todo');
    }
  };
  const deleteServerless = async (id) => {
    try {
      const response = await API.graphql(
        graphqlOperation(deleteTodo, {
          input: { id },
        })
      );
      return response.data.deleteTodo;
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting a todo');
    }
  };

  const updateServerless = async (updatedTodo) => {
    const { id, completed, task } = updatedTodo;

    try {
      const response = await API.graphql(
        graphqlOperation(updateTodo, {
          input: { id, completed, task },
        })
      );
      return response.data.updateTodo;
    } catch (error) {
      console.error(error);
      alert('Something went wrong while editing a todo');
    }
  };
  return {
    getAllTodosServerless,
    createServerless,
    deleteServerless,
    updateServerless,
  };
};
