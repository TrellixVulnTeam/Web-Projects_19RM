import React, { Component } from "react";
import { Button, Panel } from "react-bootstrap";
import { removeAllTodo } from "../store/action/action";
import { connect } from 'react-redux';
import TodoList from "./TodoList";

class TodoBody extends Component {
    constructor(props) {
        super(props);

        this.removeAll = this.removeAll.bind(this);
    }

    removeAll() {
        this.props.removeAllTodo(this.props.recipientID)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Panel bsStyle='info'>
                        <Panel.Heading className='text-center' >My Todos</Panel.Heading>
                        <Panel.Body><Button
                            className='pull-right'
                            disabled={(this.props.todoArr.length > 0) ? false : true}
                            bsStyle="danger" title="Delete All" type="reset"
                            onClick={this.removeAll}>
                            <i className="fa fa-trash" aria-hidden="true"></i> Delete All
                            </Button></Panel.Body>
                        <TodoList />
                    </Panel>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        todoArr: state.root.todo,
        recipientID: state.root.recipientID
    })
}

export default connect(mapStateToProp, { removeAllTodo })(TodoBody);