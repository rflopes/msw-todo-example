import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {LoginForm} from "./pages/LoginForm";
import {Listing} from "./pages/Listing";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/listing">
                    <Listing/>
                </Route>
                <Redirect from="/" to="/login" exact/>
            </Switch>
        </Router>
    );
}

export default App;
