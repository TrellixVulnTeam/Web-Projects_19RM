import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDLhl3-2vJtOmGXw3O5PhyL3j4O6HA-lkQ",
    authDomain: "chatapp-8dcf2.firebaseapp.com",
    databaseURL: "https://chatapp-8dcf2.firebaseio.com",
    projectId: "chatapp-8dcf2",
    storageBucket: "chatapp-8dcf2.appspot.com",
    messagingSenderId: "30236622103"
};
firebase.initializeApp(config);


export function signupaction(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                firebase.database().ref('users/' + createdUser.uid + '/').once('value')
                                    .then((user) => {
                                        dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    });
                                let currentUserUid = firebase.auth().currentUser.uid;
                                let allUsersArr = [];
                                userData.forEach(element => {
                                    let item = element.val();
                                    item.id = element.key;
                                    if (item.id !== user.uid)
                                        allUsersArr.push(item);
                                });
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                history.push('/home');
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}




export function signinaction(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let currentUserUid = firebase.auth().currentUser.uid;
                        firebase.database().ref('users/' + signedinUser.uid + '/').once('value')
                            .then((user) => {
                                dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                            });
                        let allUsersArr = [];
                        userData.forEach(element => {
                            let item = element.val();
                            item.id = element.key;
                            if (item.id !== currentUserUid)
                                allUsersArr.push(item);
                        });
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                        history.push('/home');
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}

export function logout() {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: ActionTypes.USER_LOGOUT });
                history.push('/');
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
}

export function changeRecipientUID(recpUID) {
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGERECPUID, payload: recpUID })
    }
}

export function changeRecipientName(recName) {
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGE_REC_NAME, payload: recName })
    }
}

export function sendMessage(message) {
    return dispatch => {
        let allMessages = [];
        let allRecMsgs = [];
        firebase.database().ref('users/' + message.receiverID + '/messages/' + message.senderID).push(message)
        firebase.database().ref('users/' + message.receiverID + '/messages/' + message.senderID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allRecMsgs.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_RECIPIENT_MESSAGE, payload: allRecMsgs })
            })
        firebase.database().ref('users/' + message.senderID + '/messages/' + message.receiverID).push(message)
        firebase.database().ref('users/' + message.senderID + '/messages/' + message.receiverID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allMessages.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_MESSAGE, payload: allMessages });
            })
    }
}

export function editTimeout(count) {
    return dispatch => {

        let interval = setInterval(() => {
            dispatch({ type: ActionTypes.EDIT_TIMER, payload: ++count });
            if (count === 60) {
                dispatch({ type: ActionTypes.EDIT_BOOLEAN, payload: false })
                clearInterval(interval)
            };
        }, 1000);
    }
}

export function getSpecificConvo(senderID, receiverID) {
    return dispatch => {
        let allMessages = [];
        let allRecMsgs = [];
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allRecMsgs.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_RECIPIENT_MESSAGE, payload: allRecMsgs })
            })
        firebase.database().ref('users/' + senderID + '/messages/' + receiverID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allMessages.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_MESSAGE, payload: allMessages })
            })
    }
}
export function currentMessage(currAddress) {
    return dispatch => {
        dispatch({ type: ActionTypes.CURRENT_MESSAGE_ADDRESS, payload: currAddress })
    }
}

export function allMessage_Addresses(MsgAddress) {
    return dispatch => {
        dispatch({ type: ActionTypes.ALL_MESSAGE_ADDRESSES, payload: MsgAddress })
    }
}

export function allRecMessage_Addresses(MsgAddress) {
    return dispatch => {
        dispatch({ type: ActionTypes.ALL_RECIPIENT_MESSAGE_ADDRESSES, payload: MsgAddress })
    }
}

export function editMsgVal(newVal, senderID, receiverID) {
    return dispatch => {
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID + "/" + newVal.receiverMsgID).update({ message: newVal.val })
        firebase.database().ref('users/' + senderID + '/messages/' + receiverID + "/" + newVal.senderMsgID).update({ message: newVal.val })
        let allMessages = [];
        let allRecMsgs = [];
        firebase.database().ref('users/' + senderID + '/messages/' + receiverID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allMessages.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_MESSAGE, payload: allMessages })
            })
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allRecMsgs.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_RECIPIENT_MESSAGE, payload: allRecMsgs })
            })
    }
}


export function removeMsg(senderMsgID, receiverMsgID, senderID, receiverID) {
    return dispatch => {
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID + "/" + receiverMsgID).remove()
        firebase.database().ref('users/' + senderID + '/messages/' + receiverID + "/" + senderMsgID).remove()
        let allMessages = [];
        let allRecMsgs = [];
        firebase.database().ref('users/' + senderID + '/messages/' + receiverID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allMessages.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_MESSAGE, payload: allMessages })
            })
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allRecMsgs.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_RECIPIENT_MESSAGE, payload: allRecMsgs })
            })
    }
}

export function updateSeen(senderID, receiverID, recMsgAdd) {
    return dispatch => {
        let allRecMsgs = [];
        for (let index = 0; index < recMsgAdd.length; index++) {
            firebase.database().ref('users/' + receiverID + "/messages/" + senderID + "/" + recMsgAdd[index].id).update({ seen: 'true' })
                .then(() => {
                })
                .catch((err) => {
                    console.log(err.message)
                })

        }
        firebase.database().ref('users/' + receiverID + '/messages/' + senderID).once('value')
            .then((messagesData) => {
                messagesData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    allRecMsgs.push(item);
                });
                dispatch({ type: ActionTypes.UPDATE_RECIPIENT_MESSAGE, payload: allRecMsgs })
            })
    }
}