import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import { IUserData } from "./LoginForm";

interface ITodo {
  name: string;
  author: string;
}

function TodoList({todos}: { todos: ITodo[] }) {
  return <>
    <div>Todo list:</div>
    <ul>
      {todos.map(todo => {
        return <li key={todo.name}>{todo.name} ({todo.author})</li>
      })}
    </ul>
  </>;
}

export function Listing() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<IUserData | null>(null);
  const history = useHistory();

  useEffect(() => {
    const userData = localStorage.getItem('user-data');

    if (!userData) {
      history.push('/');
    } else {
      console.log(JSON.parse(userData));
      setUser(JSON.parse(userData));
      fetch('/todos', {method: 'GET',})
        .then((res) => {
          if (res.status !== 200) {
            throw Error('bad request');
          }
          return res.json();
        })
        // Update the state with the received response
        .then(setTodos)
        .catch(setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault()
      debugger;
      fetch('/todos', {
        method: 'POST',
        body: JSON.stringify({
          username: user?.username,
          todo: event.target.elements.todo.value
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw Error('bad request');
          }
          return res.json();
        })
        // Update the state with the received response
        .then(setTodos)
        .catch(setError);
    },
    [user]
  );

  return <>
    {user ? <p>Hello, <b>{user.username}</b></p> : null}
    {error ? <p className="error">Ooooopss! Something went wrong.</p> : null}

    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="todo">Create todo:</label>
        <input
          id="todo"
          name="todo"
        />
      </div>
    </form>

    {
      !todos || todos.length === 0 ?
        <div>Nothing to do.</div> :
        <TodoList todos={todos}/>
    }
  </>;
}