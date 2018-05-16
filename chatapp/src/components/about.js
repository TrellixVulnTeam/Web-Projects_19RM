import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap'

class About extends Component {
    render() {
        return (
            <div style={{ margin: 40 }}>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>
                            <h1>
                                About
                            </h1>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        Welcome to Chat App.
                        Here are the some features availabe for the user.
                        <ul>
                            <li>
                                The User can communicate one to one.
                            </li>
                            <li>
                                The user would be able to delete the message within one minute.
                            </li>
                            <li>
                                The user would be able to edit the message within one minute.
                            </li>
                        </ul>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName
    })
}


export default connect(mapStateToProp, null)(About);
