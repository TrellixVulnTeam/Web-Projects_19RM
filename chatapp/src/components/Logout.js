import React, { Component } from "react";
import { logout } from "../store/action/action";
import { connect } from "react-redux";

class Logout extends Component {

    render() {
        return (
            <div>
                <span onClick={() => {
                    this.props.logout()
                }}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    Log Out
                 </span>
            </div>
        );
    }
}

export default connect(null, { logout })(Logout);