import React, { Component } from 'react';
import { changeRecipientUID, updateSeen, allMessage_Addresses, getSpecificConvo, allRecMessage_Addresses, changeRecipientName } from '../store/action/action'
import { connect } from 'react-redux';
import ChatBox from './chatbox';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
        }
    }

    componentDidUpdate() {
        for (let index = 0; index < this.props.messages.length; index++) {
            this.props.allMessage_Addresses(this.props.messages[index].id)
        }
        for (let index = 0; index < this.props.recipientMsgs.length; index++) {
            this.props.allRecMessage_Addresses(this.props.recipientMsgs[index].id)
        }
    }

    setRecipient(recUid, recName) {
        this.props.changeRecipientUID(recUid);
        this.props.changeRecipientName(recName);
        this.props.getSpecificConvo(this.props.currentUser, recUid);
        this.setState({
            showMessage: true
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row col-md-4'>
                    <Panel>
                        <Panel.Heading className='text-center'><h2>Users</h2></Panel.Heading>
                        <Panel.Body className="scrollbar-users-bg scrollbar-morpheus-den">
                            <ListGroup>
                                {
                                    this.props.allUsers.map((user, index) => {
                                        return (
                                            <ListGroupItem key={index} onClick={this.setRecipient.bind(this, user.uid, user.username)}>{user.username}</ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Panel.Body>
                    </Panel>

                </div>
                <div className='row'>
                    <ChatBox showMessage={this.state.showMessage} message={this.state.conversation} />
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        allUsers: state.root.users,
        messages: state.root.messages,
        recipientID: state.root.recipientID,
        recipientMsgs: state.root.recipientMsgs,
        recipientMsgAddresses: state.root.recipientMsgAddresses
    })
}

export default connect(mapStateToProp, { updateSeen, changeRecipientName, changeRecipientUID, allMessage_Addresses, getSpecificConvo, allRecMessage_Addresses })(Chat);