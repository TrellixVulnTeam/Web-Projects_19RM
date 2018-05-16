import React, { Component } from "react";
import Signup from './Signup';
import Signin from "./Signin";
import MyNavbar from './NavBar'

class Main extends Component {
    render() {
        return (
            <div>
                <MyNavbar navbartitle={<span><i className="fa fa-check-square-o" aria-hidden="true"></i> Todo-App</span>} firstitem={<Signup />} seconditem={<Signin />} />
                <h1 style={{textAlign: 'center',fontSize: 200}}>Todo-App</h1>
            </div>
        );
    }
}

export default Main;