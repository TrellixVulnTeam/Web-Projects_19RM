import React, { Component } from 'react';
import { Button, Col, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import validator from 'validator';
import { signupadmin } from '../store/action/action';
import { connect } from 'react-redux';

class AdminSignUp extends Component {

    constructor(...args) {
        super(...args);

        this.getValidationStateForEmail = this.getValidationStateForEmail.bind(this);
        this.getValidationStateForPassword = this.getValidationStateForPassword.bind(this);
        this.getValidationStateForContact = this.getValidationStateForContact.bind(this);
        this.getValidationStateForUsername = this.getValidationStateForUsername.bind(this);
        this.getValidationStateForButton = this.getValidationStateForButton.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        this._onChangeContact = this._onChangeContact.bind(this);
        this._onChangeUsername = this._onChangeUsername.bind(this);

        this.state = {
            show: false,
            email: '',
            password: '',
            contact: '',
            username: '',
            button: false
        };
    }

    getValidationStateForEmail() {
        if (this.state.email === '') return null;
        else if (!validator.isEmail(this.state.email)) return "error";
        else if (validator.isEmail(this.state.email)) return "success";
    }

    getValidationStateForButton() {
        if (this.state.email === '' || this.state.password === '' || this.state.contact === '' || this.state.username === '') {
            return true;
        }
        return false;
    }

    getValidationStateForPassword() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    _onChangeEmail(ev) {
        this.setState({
            email: ev.target.value
        })
    }

    _onChangePassword(ev) {
        this.setState({
            password: ev.target.value
        })
    }

    getValidationStateForContact() {
        if (this.state.contact === '') return null;
        else if (!validator.isMobilePhone(this.state.contact, 'any')) return 'error';
        else if (validator.isMobilePhone(this.state.contact, 'any')) return 'success';
        else return 'warning';
    }

    _onChangeContact(ev) {
        this.setState({
            contact: ev.target.value
        })
    }

    _onChangeUsername(ev) {
        this.setState({
            username: ev.target.value
        })
    }

    getValidationStateForUsername() {
        if (this.state.username === '') return null;
        else if (!validator.isAlphanumeric(this.state.username)) return "error";
        else if (validator.isAlphanumeric(this.state.username)) return "success";
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="userEmail" validationState={this.getValidationStateForEmail()}>
                        <Col componentClass={ControlLabel} sm={4}>
                            Email
			</Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="someone@user.com" value={this.state.email} onChange={this._onChangeEmail} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="username" validationState={this.getValidationStateForUsername()}>
                        <Col componentClass={ControlLabel} sm={4}>
                            Username
			</Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="username123" value={this.state.username} onChange={this._onChangeUsername} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="userPassword" validationState={this.getValidationStateForPassword()}>
                        <Col componentClass={ControlLabel} sm={4}>
                            Password
			</Col>
                        <Col sm={6}>
                            <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this._onChangePassword} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="userContact" validationState={this.getValidationStateForContact()}>
                        <Col componentClass={ControlLabel} sm={4}>
                            Contact Number
			</Col>
                        <Col sm={6}>
                            <FormControl type="tel" placeholder="+921234567" value={this.state.contact} onChange={this._onChangeContact} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={4} sm={10}>
                            <Button bsStyle="success" disabled={this.getValidationStateForButton()} onClick={() => {
                                let user = {
                                    email: this.state.email,
                                    username: this.state.username,
                                    password: this.state.password,
                                    contact: this.state.contact
                                }
                                this.setState({
                                    email: '',
                                    password: '',
                                    contact: '',
                                    username: ''
                                })
                                this.props.signupadmin(user);
                            }} >Sign Up</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default connect(null, { signupadmin })(AdminSignUp);