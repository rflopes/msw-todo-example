import React, {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import '../App.css';

export interface IUserData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export const LoginForm = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState<Error | null>(null);

    const handleUsernameChange = useCallback((event) => {
        setUsername(event.target.value)
    }, []);

    const handleFormSubmit = useCallback(
        (event) => {
            event.preventDefault()

            setLoginError(null);
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                }),
            })
                .then((res) => res.json())
                // Update the state with the received response
                .then((userData: IUserData) => {
                    localStorage.setItem('user-data', JSON.stringify(userData));
                    history.push('/listing');
                })
                .catch(setLoginError);
        },
        [username, history]
    );

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <button type="submit">Submit</button>
            </div>
            {loginError ? <p className="error">Ooooopss! Something went wrong.</p> : null}
        </form>
    );
}