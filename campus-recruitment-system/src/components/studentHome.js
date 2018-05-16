import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ListGroup, ListGroupItem, Modal, Label, Button } from 'react-bootstrap';
import { apply, changeRecipientUID } from '../store/action/action'

class StudentHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCompany: false,
            companyName: '',
            companyMember: '',
            companyEmail: '',
            appliedButton: false
        }

        this.handleHideCompany = this.handleHideCompany.bind(this);
    }

    handleHideCompany() {
        this.setState({ showCompany: false });
    }

    render() {
        return (
            <div>
                <Panel>
                    <Panel.Heading className='text-center'><h2>Companies</h2></Panel.Heading>
                    <Panel.Body className="scrollbar-users-bg scrollbar-morpheus-den">
                        <ListGroup>
                            {
                                this.props.companyMembers.map((user, index) => {
                                    return (
                                        <ListGroupItem key={index}
                                        >{user.companyName}
                                            <span style={{ marginLeft: 5 }} className="pull-right title"
                                                onClick={() => {
                                                    this.setState({ showCompany: true, companyName: user.companyName, companyMember: user.username, companyEmail: user.email });
                                                    if (user.hasOwnProperty(this.props.currentUser)) {
                                                        this.setState({
                                                            appliedButton: true
                                                        })
                                                    }
                                                    else {
                                                        this.setState({
                                                            appliedButton: false
                                                        })
                                                    }
                                                    this.props.changeRecipientUID(user.uid);
                                                }}
                                            >
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                    </Panel.Body>
                </Panel>
                <Modal className="modal-container"
                    {...this.props}
                    show={this.state.showCompany}
                    onHide={this.handleHideCompany}
                    dialogClassName="custom-modal"
                    backdrop='static'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            {this.state.companyName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>
                            Name <Label>{this.state.companyMember}</Label>
                        </h3>
                        <h3>
                            Email <Label>{this.state.companyEmail}</Label>
                        </h3>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                this.props.apply(this.props.currentUser, this.props.recipientID);
                                this.handleHideCompany();
                            }
                            }
                            disabled={this.state.appliedButton}>Apply</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
        companyMembers: state.root.companyMembers,
        currentUser: state.root.currentUser,
        recipientID: state.root.recipientID,
        appliedCompanies: state.root.appliedCompanies
    })
}

export default connect(mapStateToProp, { apply, changeRecipientUID })(StudentHome);

