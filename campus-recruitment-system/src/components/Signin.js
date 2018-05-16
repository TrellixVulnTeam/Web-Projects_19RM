import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Breadcrumb, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { Route, Router } from 'react-router-dom';
import StudentSignin from './studentSignin';
import AdminSignin from './adminSignin';
import CompanySignin from './companySignin'
import history from '../History';


class Signin extends Component {
    constructor(...args) {
        super(...args);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            email: '',
            password: '',
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
            <div>
                <ButtonToolbar>
                    <span onClick={this.handleShow}>
                        <i className="fa fa-sign-in" aria-hidden="true"></i> SignIn
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
                                <i className="fa fa-sign-in" aria-hidden="true"></i> SignIn
						</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Router history={history}>
                                <div>
                                    <Breadcrumb>
                                        <Breadcrumb.Item ><NavLink
                                            to="/adminSignin"
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'blue'
                                            }}
                                        >Admin</NavLink>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item ><NavLink
                                            to="/companySignin"
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'blue'
                                            }}
                                        >Company</NavLink>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item ><NavLink
                                            to="/studentSignin"
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'blue'
                                            }}
                                        >Student</NavLink>
                                        </Breadcrumb.Item>
                                        <Route exact path="/adminSignin" component={AdminSignin} />
                                        <Route exact path="/companySignin" component={CompanySignin} />
                                        <Route exact path="/studentSignin" component={StudentSignin} />
                                    </Breadcrumb>
                                </div>
                            </Router>
                        </Modal.Body>
                    </Modal>
                </ButtonToolbar>
            </div>
        );
    }
}

export default connect(null, null)(Signin);