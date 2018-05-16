import React, { Component } from 'react';
import { ButtonToolbar, Breadcrumb, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Route, Router } from 'react-router-dom';
import StudentSignup from './studentSignup';
import AdminSignup from './adminSignup';
import CompanySignup from './companySignup';
import history from '../History';

class Signup extends Component {
    constructor(...args) {
        super(...args);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            email: '',
            password: '',
            contact: '',
            username: '',
            button: false
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
        history.push('/');
    }

    render() {
        return (
            <ButtonToolbar>
                <span onClick={this.handleShow}>
                    <i className="fa fa-user-plus" aria-hidden="true"></i> Signup
				</span>

                <Modal bsSize='large'
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                    backdrop='static'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            <i className="fa fa-user-plus" aria-hidden="true"></i> Signup
						</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Router history={history}>
                            <div>
                                <Breadcrumb>
                                    {/* <Breadcrumb.Item ><NavLink
                                        to="/adminSignup"
                                        activeStyle={{
                                            fontWeight: 'bold',
                                            color: 'blue'
                                        }}
                                    >Admin</NavLink>
                                    </Breadcrumb.Item> */}
                                    <Breadcrumb.Item ><NavLink
                                        to="/companySignup"
                                        activeStyle={{
                                            fontWeight: 'bold',
                                            color: 'blue'
                                        }}
                                    >Company</NavLink>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item ><NavLink
                                        to="/studentSignup"
                                        activeStyle={{
                                            fontWeight: 'bold',
                                            color: 'blue'
                                        }}
                                    >Student</NavLink>
                                    </Breadcrumb.Item>
                                    <Route exact path="/adminSignup" component={AdminSignup} />
                                    <Route exact path="/companySignup" component={CompanySignup} />
                                    <Route exact path="/studentSignup" component={StudentSignup} />
                                </Breadcrumb>
                            </div>
                        </Router>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        )
    }
}

function mapStateToProps(state) {
    return ({
    })
}

export default connect(mapStateToProps, null)(Signup);