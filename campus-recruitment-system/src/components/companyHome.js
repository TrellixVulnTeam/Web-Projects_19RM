import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Label, ListGroup, ListGroupItem, Modal, Badge } from 'react-bootstrap';

class CompanyHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            studentName: '',
            studentQualification: '',
            studentInstitute: ' '
        }

        this.handleHide = this.handleHide.bind(this);
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className='container'>
                <Panel>
                    <Panel.Heading className='text-center'><h2>Students</h2></Panel.Heading>
                    <Panel.Body className="scrollbar-users-bg scrollbar-morpheus-den">
                        <ListGroup>
                            {
                                this.props.students.map((user, index) => {
                                    return <ListGroupItem key={user.uid}
                                    >{user.username} <span>{(this.props.users.hasOwnProperty(user.uid)) ? <Badge style={{ backgroundColor: 'blue' }}>Applied</Badge> : null}</span>
                                        <span className="pull-right title"
                                            onClick={() => this.setState({ show: true, studentQualification: user.qualification, studentInstitute: user.institute, studentName: user.username })}
                                        >
                                            <i className="fa fa-user"></i>
                                        </span>

                                    </ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </Panel.Body>
                </Panel>
                <Modal className="modal-container"
                    {...this.props}
                    show={this.state.show}
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
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
        students: state.root.students,
        appliedStudents: state.root.appliedStudents,
        users: state.root.users
    })
}

export default connect(mapStateToProp, null)(CompanyHome);