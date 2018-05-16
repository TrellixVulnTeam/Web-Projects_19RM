import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSeen, sendMessage, editTimeout, getSpecificConvo, currentMessage, allMessage_Addresses } from '../store/action/action'
import { ListGroup, Panel, FormControl, ListGroupItem, Button } from 'react-bootstrap';
import EditButton from './EditButton'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: '',
            displayEdit: 'none'
        }
        this.getValidationStateForButton = this.getValidationStateForButton.bind(this);
    }

    getValidationStateForButton() {
        if (this.state.textAreaVal === '' || this.props.recipientID === '') {
            return true;
        }
        return false;
    }

    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }

    sendMessage() {
        let messageData = {
            senderID: this.props.currentUser,
            receiverID: this.props.recipientID,
            message: this.state.textAreaVal,
            timeStamp: new Date().toLocaleString(),
            seen: false,
            edit: true
        }
        this.props.sendMessage(messageData);
        this.props.editTimeout(0);
        this.setState({
            textAreaVal: ''
        })
    }
    render() {
        if (this.props.recipientMsgs.length !== 0)
            this.props.currentMessage(this.props.recipientMsgs[this.props.recipientMsgs.length - 1].id);
        let indents = [];
        let currentTime, msgTime;
        if (this.props.recipientMsgs.length !== 0)
            if ((this.props.recipientID !== '') && (this.props.recipientMsgs[this.props.recipientMsgs.length - 1].seen === false)) {
                this.props.updateSeen(this.props.currentUser, this.props.recipientID, this.props.recipientMsgs)
            }
        for (let index = 0; index < this.props.messages.length; index++) {
            this.props.allMessage_Addresses(this.props.messages[index].id)
            currentTime = new Date().toLocaleString();
            msgTime = this.props.messages[index].timeStamp;
            if (this.props.messages[index].senderID === this.props.currentUser)
                indents.push(<div key={this.props.messages[index].id} className='messageObjRight'
                >
                    {
                        ((Date.parse(currentTime) - Date.parse(msgTime) <= 60000) && (this.props.editOpt.timer < 60))
                            ?
                            <span>
                                <EditButton firstvalue={this.props.messages[index].message} secondvalue={this.props.messages[index].id} thirdvalue={this.props.recipientMsgAddresses[index]} />
                            </span>
                            :
                            <span></span>
                    }
                    <div className='messageDivRight'>
                        <ListGroupItem className='message'>
                            {this.props.messages[index].message}
                        </ListGroupItem>
                    </div>
                    <div style={{ float: 'right', clear: 'both', fontSize: 10 }}>
                        {this.props.messages[index].timeStamp}
                    </div>
                    {
                        ((index === this.props.messages.length - 1) && (this.props.messages[index].seen === 'true'))
                            ?
                            <div style={{ float: 'right', clear: 'both', fontSize: 8 }}>
                                Seen
                            </div>
                            :
                            <span></span>
                    }
                </div>)
            else if (this.props.messages[index].senderID === this.props.recipientID)
                indents.push(<div key={this.props.messages[index].id} className='messageObjLeft'
                >
                    <div className='messageDivLeft'>
                        <ListGroupItem className='message'>
                            {this.props.messages[index].message}
                        </ListGroupItem>
                    </div>
                    <div style={{ float: 'left', clear: 'both', fontSize: 10 }}>
                        {this.props.messages[index].timeStamp}
                    </div>
                </div>)
        }
        return (
            <div className='row col-md-8'>
                <Panel>
                    <Panel.Heading id="msgTitle" className='text-center'>
                        {
                            (this.props.recName === '')
                                ?
                                <h2>Thread</h2>
                                :
                                <h2>{this.props.recName}</h2>
                        }
                    </Panel.Heading>
                    <Panel.Body className="scrollbar scrollbar-primary">
                        <ListGroup>
                            {
                                (this.props.showMessage === false)
                                    ?
                                    <div>
                                        <h1>
                                            No Conversation Selected!
                                        </h1>
                                    </div>
                                    :
                                    (indents.length === 0)
                                        ?
                                        <div>
                                            <h1>
                                                No Conversation Available!
                                        </h1>
                                        </div>
                                        :
                                        indents

                            }
                        </ListGroup>
                    </Panel.Body>
                    <Panel.Footer>
                        <FormControl componentClass="textarea" style={{ height: 100 }} value={this.state.textAreaVal} onChange={this._textAreaHandler.bind(this)} />
                        <Button bsStyle="primary"
                            onClick={this.sendMessage.bind(this)}
                            disabled={this.getValidationStateForButton()}
                        >
                            Send</Button>
                    </Panel.Footer>
                </Panel>


            </div >
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        recipientID: state.root.recipientID,
        messages: state.root.messages,
        editOpt: state.root.editOpt,
        currentMessageAddress: state.root.currentMessageAddress,
        allMessageAddresses: state.root.allMessageAddresses,
        recipientMsgs: state.root.recipientMsgs,
        recName: state.root.recName,
        recipientMsgAddresses: state.root.recipientMsgAddresses
    })
}

export default connect(mapStateToProp, { updateSeen, getSpecificConvo, sendMessage, editTimeout, currentMessage, allMessage_Addresses })(ChatBox);
