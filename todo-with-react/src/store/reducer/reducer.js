import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    currentUser: '',
    recipientID: '',
    todo: []
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
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                recipientID: action.payload
            })
        case ActionTypes.USER_LOGOUT:
            return (
                state = INITIAL_STATE
            )
        case ActionTypes.UPDATE_TODO:
            return ({
                ...state,
                todo: action.payload
            }
            )
        case ActionTypes.ADD_TODO:
            let tempTodo = state.todo;
            tempTodo.push(action.payload);
            return ({
                ...state,
                todo: tempTodo
            })
        case ActionTypes.REMOVE_TODO:
            return ({
                ...state,
                todo: []
            })
        default:
            return state;
    }

}