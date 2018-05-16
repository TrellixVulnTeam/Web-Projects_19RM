import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ListGroup, ListGroupItem, Modal, Label } from 'react-bootstrap';
import { removeCompany, removeStudent } from "../store/action/action";

class AdminHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showStudent: false,
            showCompany: false,
            studentName: '',
            studentQualification: '',
            studentInstitute: '',
            companyName: '',
            companyMember: '',
            companyEmail: ''
        }

        this.handleHide = this.handleHide.bind(this);
        this.handleHideCompany = this.handleHideCompany.bind(this);
    }

    handleHide() {
        this.setState({ showStudent: false });
    }

    handleHideCompany() {
        this.setState({ showCompany: false });
    }

    render() {
        return (
            <div className='container'>
                <div className='row col-md-6'>
                    <Panel>
                        <Panel.Heading className='text-center'><h2>Students</h2></Panel.Heading>
                        <Panel.Body className="scrollbar-users-bg scrollbar-morpheus-den">
                            <ListGroup>
                                {
                                    this.props.students.map((user, index) => {
                                        return (
                                            <ListGroupItem key={index}
                                            >{user.username}
                                                <span style={{ marginLeft: 5 }} className="pull-right title"
                                                    onClick={() => this.setState({ showStudent: true, studentQualification: user.qualification, studentInstitute: user.institute, studentName: user.username })}
                                                >
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <span style={{ marginLeft: 5 }} className="pull-right title"
                                                    onClick={() => {
                                                        this.props.removeStudent(user.uid)
                                                    }}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </span>
                                            </ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Panel.Body>
                    </Panel>
                </div>
                <div className='row col-md-6'>
                    <Panel>
                        <Panel.Heading className='text-center'><h2>Company Members</h2></Panel.Heading>
                        <Panel.Body className="scrollbar-users-bg scrollbar-morpheus-den">
                            <ListGroup>
                                {
                                    this.props.companyMembers.map((user, index) => {
                                        return (
                                            <ListGroupItem key={index}
                                            >{user.companyName}
                                                <span style={{ marginLeft: 5 }} className="pull-right title"
                                                    onClick={() => this.setState({ showCompany: true, companyName: user.companyName, companyEmail: user.email, companyMember: user.username })}
                                                >
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <span style={{ marginLeft: 5 }} className="pull-right title"
                                                    onClick={() => {
                                                        this.props.removeCompany(user.uid)
                                                    }}
                                                >
                                                    <i className="fa fa-trash"></i>
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
                    </Modal>
                    <Modal className="modal-container"
                        {...this.props}
                        show={this.state.showStudent}
                        onHide={this.handleHide}
                        dialogClassName="custom-modal"
                        backdrop='static'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                {this.state.studentName}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>
                                Name <Label>{this.state.studentName}</Label>
                            </h3>
                            <h3>
                                Qualification <Label>{this.state.studentQualification}</Label>
                            </h3>
                            <h3>
                                Institute <Label>{this.state.studentInstitute}</Label>
                            </h3>



                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
        students: state.root.students,
        companyMembers: state.root.companyMembers
    })
}

export default connect(mapStateToProp, { removeCompany, removeStudent })(AdminHome);

