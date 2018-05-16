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
                        Welcome to Campus Recruitment App.
                        The following application is beneficial for students, various companies visiting the campus for recruitment and even the college placement officer. The software system allows the student to create their profiles and upload their details. The admin can check each student details and can remove faulty accounts.
                        Here are the some features availabe for the user.
                        <ul>
                            <li>
                        Multiple companies can offer jobs by creating accounts.
                            </li>
                            <li>
                            Students can apply for the job.
                            </li>
                            <li>
                            Admin can control everything efficiently.
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
