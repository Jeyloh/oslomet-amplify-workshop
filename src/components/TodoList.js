import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css';
import { useServerlessCRUD } from '../hooks/useServerlessCRUD';
import { useServerlessSubscriptions } from '../hooks/useServerlessSubscriptions';

const stupidTodoList = [
  { id: uuid(), task: 'task 1', completed: false },
  { id: uuid(), task: 'task 2', completed: true },
  { id: uuid(), task: 'task 3', completed: true },
];

function TodoList() {
  //// TODO #4: Uncomment the Subscriptions hook.
  //// This requires you to remove the line under it, which creates the todos and setTodos state
  //// That again will make all places calling setTodos fail.
  //// Remove all code where setTodos is called in this file, including the useEffect block.
  //// The useEffect block is replaced with some new code in the useServerlessSubscriptions() hook
  // const { todos } = useServerlessSubscriptions();

  //// TODO #3: Replace "stupidTodoList" with an empty array like so:
  // const [todos, setTodos] = useState([]]);
  const [todos, setTodos] = useState(stupidTodoList);

  //// TODO #3: Uncomment the CRUD hook to get options to read/write/delete/update data in the database.
  // const {
  //   getAllTodosServerless,
  //   createServerless,
  //   deleteServerless,
  //   updateServerless,
  // } = useServerlessCRUD();

  //// TODO #3: Uncomment this whole block of code which gets all items from our database
  // useEffect(() => {
  //   async function getAllTodos() {
  //     const todos = await getAllTodosServerless();
  //     setTodos(todos);
  //   }
  //   getAllTodos();
  // }, []);

  const create = (newTodo) => {
    setTodos([newTodo, ...todos]);
    //// TODO #3: Uncomment the usage of these fucntions too
    // createServerless(newTodo);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    //// TODO #3: Uncomment the usage of these fucntions too
    // deleteServerless(id);
  };

  const update = (updatedTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
    //// TODO #3: Uncomment the usage of these fucntions too
    // updateServerless(updatedTodo);
  };

  return (
    <div className='TodoList'>
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <NewTodoForm createTodo={create} />
      <ul>
        {todos?.length === 0 && 'You have nothing to do!'}
        {todos
          .sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
          )
          .map((todo) => (
            <Todo update={update} remove={remove} key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
}

export default TodoList;
