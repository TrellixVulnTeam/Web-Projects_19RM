import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './History';
import AdminHome from './components/adminHome';
import StudentHome from './components/studentHome';
import CompanyHome from './components/companyHome';
import Main from './components/Main';
import MyNavBar from "./components/NavBar";
import Logout from "./components/Logout";
import Signin from './components/Signin';
import Signup from './components/Signup';
import About from './components/About';

class Routers extends Component {
    render() {
        return (
            <div>
                <MyNavBar navbartitle={<span><i className="fa fa-check-square-o" aria-hidden="true"></i> Campus Recruitment System</span>} firstitem={(this.props.userName === '') ? <Signup /> : this.props.userName} seconditem={(this.props.userName === '') ? <Signin /> : <Logout />} />
                {((this.props.userName === '') && ((history.location.pathname === '/adminHome') || (history.location.pathname === '/companyHome') || (history.location.pathname === '/studentHome'))) ? history.push('/') : null}
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/adminHome" component={AdminHome} />
                        <Route exact path="/studentHome" component={StudentHome} />
                        <Route exact path="/companyHome" component={CompanyHome} />
                        <Route exact path="/about" component={About} />
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