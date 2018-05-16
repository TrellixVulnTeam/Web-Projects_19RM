import React, { Component } from "react";
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";

class TodoApp extends Component {

    render() {
        return (
            <div className="container">
                <TodoHeader />
                <TodoBody />
            </div>
        )
    }
}

export default TodoApp;