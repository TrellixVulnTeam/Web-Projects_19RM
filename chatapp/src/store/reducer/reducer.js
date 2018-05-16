import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    currentUser: '',
    users: [],
    messages: [],
    recipientID: '',
    recName: '',
    editOpt: {
            timer: 0,
            canEdit: true
    },
    recipientMsgs: [],
    currentMessageAddress: '',
    allMessageAddresses: [],
    recipientMsgAddresses: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            })
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                recipientID: action.payload
            })
        case ActionTypes.CHANGE_REC_NAME:
            return ({
                ...state,
                recName: action.payload
            })
        case ActionTypes.UPDATE_MESSAGE:
            return ({
                ...state,
                messages: action.payload
            })
        case ActionTypes.UPDATE_RECIPIENT_MESSAGE:
            return ({
                ...state,
                recipientMsgs: action.payload
            })
        case ActionTypes.USER_LOGOUT:
            return (
                state = INITIAL_STATE
            )
        case ActionTypes.EDIT_TIMER:
            return ({
                ...state,
                editOpt: {
                    ...state.editOpt,
                    timer: action.payload
                }
            })
        case ActionTypes.EDIT_BOOLEAN:
            return ({
                ...state,
                editOpt: {
                    ...state.editOpt,
                    canEdit: action.payload
                }
            })
        case ActionTypes.CURRENT_MESSAGE_ADDRESS:
            return ({
                ...state,
                currentMessageAddress: action.payload
            })
        case ActionTypes.ALL_MESSAGE_ADDRESSES:
            let tempMsgArr = state.allMessageAddresses;
            if (tempMsgArr.indexOf(action.payload) === -1) {
                tempMsgArr.push(action.payload)
                return ({
                    ...state,
                    allMessageAddresses: tempMsgArr
                })
            }
            else return state;
        case ActionTypes.ALL_RECIPIENT_MESSAGE_ADDRESSES:
            let tempRecArr = state.recipientMsgAddresses;
            if (tempRecArr.indexOf(action.payload) === -1) {
                tempRecArr.push(action.payload)
                return ({
                    ...state,
                    recipientMsgAddresses: tempRecArr
                })
            }
            else return state;
        default:
            return state;
    }

}