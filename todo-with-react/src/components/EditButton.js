import React, { Component } from "react";
import { Button, Popover, OverlayTrigger, ButtonGroup, Modal, FormGroup, Col, ControlLabel, FormControl } from "react-bootstrap";
import { removeTodo, editTodoVal } from "../store/action/action";
import { connect } from 'react-redux';

class EditButton extends Component {

        constructor(props) {
            super(props);

            this.state = {
                show: false,
                editTodo: this.props.textvalue,
                todoId: this.props.textid
            }

            this._onChangeEdit = this._onChangeEdit.bind(this);
            this.getValidationStateForEdit = this.getValidationStateForEdit.bind(this);
            this.handleHide = this.handleHide.bind(this);
        }

        handleHide() {
            this.setState({ show: false });
        }

    _onChangeEdit(ev) {
        this.setState({      
            editTodo: ev.target.value
        })
    }

    getValidationStateForEdit() {
        if (this.state.editTodo === '') return null;
        else return 'success';
    }

    render() {
        const popoverTop = (
            <Popover id="popover-positioned-scrolling-top">
                <ButtonGroup>
                    <Button
                        onClick={() => this.setState({ show: true, editTodo: this.props.firstvalue, todoID: this.props.secondvalue })}
                        bsSize="small"
                    >Edit
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.removeTodo(this.props.secondvalue, this.props.recipientID)
                        }}
                        bsSize="small"
                    >Delete
                </Button>
                </ButtonGroup>
            </Popover>
        );
        return (
            <ButtonGroup className="pull-right">
                <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={popoverTop}
                    rootClose
                >
                    <Button><strong>...</strong></Button>
                </OverlayTrigger>
                <Modal className="modal-container" style={{ height: 200 }}
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    aria-labelledby="contained-modal-title"
                    backdrop='static'
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title">
                            Edit Your Task...
            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="editTodo" validationState={this.getValidationStateForEdit()}>
                            <Col componentClass={ControlLabel} sm={4}>
                                Edit Your Task
                        </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="Your Task..." value={this.state.editTodo} onChange={this._onChangeEdit} />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                this.props.editTodoVal({ id: this.props.secondvalue, val: this.state.editTodo }, this.props.recipientID, this.props.todoArr);
                                this.handleHide();
                            }
                            }>Save</Button>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonGroup>
        )
    }
}

function mapStateToProp(state) {
    return ({
        todoArr: state.root.todo,
        recipientID: state.root.recipientID
    })
}

export default connect(mapStateToProp, { removeTodo, editTodoVal })(EditButton);