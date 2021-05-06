import React, { useState } from 'react';
import './Todo.css';
import { timeSince } from './timeSince';

function Todo({ todo, remove, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleRemove = (evt) => {
    remove(evt.target.id);
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    update({
      ...todo,
      task,
    });
    toggleFrom();
  };

  const toggleCompleted = (evt) => {
    evt.preventDefault();
    update({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleChange = (evt) => {
    setTask(evt.target.value);
  };

  let result;
  if (isEditing) {
    result = (
      <div className='Todo'>
        <form className='Todo-edit-form' onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task} type='text' />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className='Todo'>
        <li
          id={todo.id}
          onClick={toggleCompleted}
          className={todo.completed ? 'Todo-task completed' : 'Todo-task'}
        >
          {todo.task}
          {/* TODO #3.5 Uncomment this block to see the text of when and by who the todo was updated. */}
          {/* <div className={'Todo-meta-data'}>
            Updated {timeSince(todo.updatedAt)} by {todo.owner}
          </div> */}
        </li>

        <div className='Todo-buttons'>
          <button onClick={toggleFrom}>
            <i className='fas fa-pen' />
          </button>
          <button onClick={handleRemove}>
            <i id={todo.id} className='fas fa-trash' />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
