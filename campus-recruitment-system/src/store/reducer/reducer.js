import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    currentUser: '',
    users: {},
    recipientID: '',
    recName: '',
    students: [],
    companyMembers: [],
    appliedStudents: [],
    appliedCompanies: []
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
        case ActionTypes.USER_LOGOUT:
            return (
                state = INITIAL_STATE
            )
        case ActionTypes.ALL_STUDENTS:
            return ({
                ...state,
                students: action.payload
            })
        case ActionTypes.ALL_COMPANY_USERS:
            return ({
                ...state,
                companyMembers: action.payload
            })
        case ActionTypes.APPLIED_STUDENTS:
            return ({
                ...state,
                appliedStudents: action.payload
            })
        case ActionTypes.APPLIED_COMPANIES:
            return ({
                ...state,
                appliedCompanies: action.payload
            })
        default:
            return state;
    }
}