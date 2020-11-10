import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';


import '../App.css';
import {IUserData} from "./LoginForm";

interface ITodo {
    name: string;
    author: string;
}

export function Listing() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [user, setUser] = useState<IUserData | null>(null);
    const history = useHistory();

    useEffect(() => {
        fetch('/todos', {method: 'GET',})
            .then((res) => res.json())
            // Update the state with the received response
            .then(setTodos)
            .catch(setError);

        const userData = localStorage.getItem('user-data');

        if (!userData) {
            history.push('/');
        } else {
            setUser(JSON.parse(userData));
        }
        // setUser({
        //     id: 'id-1',
        //     username: 'johnDoe',
        //     firstName: 'John',
        //     lastName: 'Doe'
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function renderTodoList() {
        return <div>Todo list</div>;
    }

    return <>
        {user ? <p>Hello, <b>{user.username}</b></p> : null}
        {error ? <p className="error">Ooooopss! Something went wrong.</p> : null}
        {
            !todos || todos.length === 0 ?
                <div>Nothing to do.</div> :
                renderTodoList()
        }
    </>;
}