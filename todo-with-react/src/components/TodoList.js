import React, { Component } from "react";
import { ListGroupItem, ListGroup } from "react-bootstrap";
import EditButton from "./EditButton";
import { connect } from "react-redux";

class TodoList extends Component {

    shouldComponentUpdate(newProps, newState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    render() {
        return (
            <ListGroup>
                {this.props.todoArr.map((item) => {
                    return <ListGroupItem key={item['id']} className="list-group-item">
                        <div className='row' style={{ margin: 0 }}>{item['todoVal']}
                            <EditButton firstvalue={item['todoVal']} secondvalue={item['id']} />
                        </div>
                    </ListGroupItem>
                })}
            </ListGroup>
        )
    }
}

function mapStateToProp(state) {
    return ({
        todoArr: state.root.todo,
    })
}

export default connect(mapStateToProp, null)(TodoList);