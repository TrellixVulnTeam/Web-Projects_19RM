import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyNavBar from "./NavBar";
import Logout from "./Logout";
import TodoApp from "./TodoApp";

class Home extends Component {

    render() {
        return (
            <div>
                <MyNavBar navbartitle={<span><i className="fa fa-check-square-o" aria-hidden="true"></i> Todo-App</span>} firstitem={this.props.userName} seconditem={<Logout />} />
                <TodoApp />
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
    })
}

export default connect(mapStateToProp, null)(Home);

