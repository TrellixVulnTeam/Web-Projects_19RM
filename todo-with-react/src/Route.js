import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/Home';
import history from './History';
import Main from './components/Main';

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/home" component={Home} />
                </div>
            </Router>
        )
    }
}

export default Routers;