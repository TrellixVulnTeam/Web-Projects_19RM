import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { addTodo } from "../store/action/action";

class TodoHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo: ''
        }

        this.getValidationStateForTodo = this.getValidationStateForTodo.bind(this);
        this._onChange = this._onChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    _onChange(ev) {
        this.setState({
            todo: ev.target.value
        })
    }

    getValidationStateForTodo() {
        if (this.state.todo === '') return null;
        else return 'success';
    }

    addTodo() {
        if (this.state.todo !== '') {
            this.props.addTodo(this.state.todo, this.props.recipientID);
            this.setState({
                todo: ''
            })
        }
    }


    render() {
        return (

            <div className="row text-center">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Todo-App</h1>
                    <p className="lead">Here you can manage your tasks!</p>
                    <hr className="my-4" />
                    <FormGroup validationState={this.getValidationStateForTodo()}>
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Your Task
                            </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Your Task..." value={this.state.todo} onChange={this._onChange} />
                            <FormControl.Feedback />
                        </Col>
                        <Button bsStyle="info" disabled={(this.state.todo === '') ? true : false} title="Add Todo" onClick={this.addTodo}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </Button>
                    </FormGroup>
                    <br />
                    <hr className="my-4" />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        recipientID: state.root.recipientID
    })
}

export default connect(mapStateToProps, { addTodo })(TodoHeader);