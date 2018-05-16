import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './History';
import Home from './components/Home';
import Main from './components/Main';
import MyNavBar from "./components/NavBar";
import Logout from "./components/Logout";
import Signin from './components/Signin';
import Signup from './components/Signup';
import About from './components/about'

class Routers extends Component {
    render() {
        return (
            <div>
                <MyNavBar navbartitle={<span><i className="fa fa-check-square-o" aria-hidden="true"></i> My-App</span>} firstitem={(this.props.userName === '') ? <Signup /> : this.props.userName} seconditem={(this.props.userName === '') ? <Signin /> : <Logout />} />
                {((this.props.userName === '') && (history.location.pathname === '/home')) ? history.push('/') : null}
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/home" component={Home} />
                        <Route excat path="/about" component={About} />
                    </div>
                </Router>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
    })
}

export default connect(mapStateToProp, null)(Routers);