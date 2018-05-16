import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signincompany } from '../store/action/action';
import { FormGroup, FormControl, ControlLabel, Col, Button, Form } from 'react-bootstrap';
import validator from 'validator';


class CompanySignin extends Component {
    constructor(...args) {
        super(...args);

        this.getValidationStateForEmail = this.getValidationStateForEmail.bind(this);
        this.getValidationStateForPassword = this.getValidationStateForPassword.bind(this);
        this.getValidationStateForButton = this.getValidationStateForButton.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

        this.state = {
            email: '',
            password: '',
            button: false
        };
    }


    getValidationStateForButton() {
        if (this.state.email === '' || this.state.password === '') {
            return true;
        }
        return false;
    }

    getValidationStateForEmail() {
        if (this.state.email === '') return null;
        else if (!validator.isEmail(this.state.email)) return "error";
        else if (validator.isEmail(this.state.email)) return "success";
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

                    <FormGroup controlId="userPassword" validationState={this.getValidationStateForPassword()}>
                        <Col componentClass={ControlLabel} sm={4}>
                            Password
</Col>
                        <Col sm={6}>
                            <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this._onChangePassword} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={4} sm={10}>
                            <Button bsStyle="success" disabled={this.getValidationStateForButton()}
                                onClick={() => {
                                    let user = {
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                    this.setState({
                                        email: '',
                                        password: ''
                                    })
                                    this.props.signincompany(user);
                                }} >Sign In</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default connect(null, { signincompany })(CompanySignin);