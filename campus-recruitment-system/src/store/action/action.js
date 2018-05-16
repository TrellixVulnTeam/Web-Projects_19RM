import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDGhyT3oumZBVSJoMDgGRRi6DH87Dt6MMY",
    authDomain: "boilerplate-da276.firebaseapp.com",
    databaseURL: "https://boilerplate-da276.firebaseio.com",
    projectId: "boilerplate-da276",
    storageBucket: "boilerplate-da276.appspot.com",
    messagingSenderId: "885088308470"
};
firebase.initializeApp(config);


export function signupadmin(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('admins/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('admins/').once('value')
                            .then((userData) => {
                                firebase.database().ref('admins/' + createdUser.uid + '/').once('value')
                                    .then((user) => {
                                        dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    });
                                let currentUserUid = firebase.auth().currentUser.uid;
                                let allStudents = [];
                                firebase.database().ref('students/').once('value')
                                    .then((students) => {
                                        students.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            allStudents.push(item);
                                        })
                                        dispatch({ type: ActionTypes.ALL_STUDENTS, payload: allStudents });
                                    })
                                let allCompanyMembers = [];
                                firebase.database().ref('companyUsers/').once('value')
                                    .then((companyUsers) => {
                                        companyUsers.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            allCompanyMembers.push(item);
                                        })
                                        dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: allCompanyMembers });
                                    })
                                let allUsersArr = [];
                                userData.forEach(element => {
                                    let item = element.val();
                                    item.id = element.key;
                                    if (item.id !== user.uid)
                                        allUsersArr.push(item);
                                });
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                history.push('/adminHome');
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}


export function signinadmin(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('admins/').once('value')
                    .then((userData) => {
                        let currentUserUid = firebase.auth().currentUser.uid;
                        firebase.database().ref('admins/' + signedinUser.uid + '/').once('value')
                            .then((user) => {
                                if (!userData.hasChild(signedinUser.uid)) {
                                    alert('No Admin Found on this Email ID!')
                                    firebase.auth().signOut()
                                        .then(() => {
                                            dispatch({ type: ActionTypes.USER_LOGOUT });
                                            history.push('/');
                                        })
                                        .catch((error) => {
                                            console.log(error.message)
                                        });
                                }
                                else {
                                    dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    let allStudents = [];
                                    firebase.database().ref('students/').once('value')
                                        .then((students) => {
                                            students.forEach(element => {
                                                let item = element.val();
                                                item.id = element.key;
                                                allStudents.push(item);
                                            })
                                            dispatch({ type: ActionTypes.ALL_STUDENTS, payload: allStudents });
                                        })
                                    let allCompanyMembers = [];
                                    firebase.database().ref('companyUsers/').once('value')
                                        .then((companyUsers) => {
                                            companyUsers.forEach(element => {
                                                let item = element.val();
                                                item.id = element.key;
                                                allCompanyMembers.push(item);
                                            })
                                            dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: allCompanyMembers });
                                        })
                                    let allUsersArr = [];
                                    userData.forEach(element => {
                                        let item = element.val();
                                        item.id = element.key;
                                        if (item.id !== currentUserUid)
                                            allUsersArr.push(item);
                                    });
                                    dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                    dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                    history.push('/adminHome');
                                }
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}

export function signupcompany(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('companyUsers/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('companyUsers/').once('value')
                            .then((userData) => {
                                firebase.database().ref('companyUsers/' + createdUser.uid + '/').once('value')
                                    .then((user) => {
                                        dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    });
                                let currentUserUid = firebase.auth().currentUser.uid;
                                let allStudents = [];
                                firebase.database().ref('students/').once('value')
                                    .then((students) => {
                                        students.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            allStudents.push(item);
                                        })
                                        dispatch({ type: ActionTypes.ALL_STUDENTS, payload: allStudents });
                                    })
                                let appliedStudentsArr = [];
                                firebase.database().ref('companyUsers/' + createdUser.uid + "/").once('value')
                                    .then((appliedStudents) => {
                                        appliedStudents.forEach(element => {
                                            let item = element.val();
                                            appliedStudentsArr.push(item);
                                        })
                                        dispatch({ type: ActionTypes.APPLIED_STUDENTS, payload: appliedStudentsArr });
                                        let allUsersArr = appliedStudents.val();
                                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                    });
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                history.push('/companyHome');
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}

export function signincompany(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('companyUsers/').once('value')
                    .then((userData) => {
                        let currentUserUid = firebase.auth().currentUser.uid;
                        firebase.database().ref('companyUsers/' + signedinUser.uid + '/').once('value')
                            .then((user) => {
                                if (!userData.hasChild(signedinUser.uid)) {
                                    alert('No Company Found on this Email ID!')
                                    firebase.auth().signOut()
                                        .then(() => {
                                            dispatch({ type: ActionTypes.USER_LOGOUT });
                                            history.push('/');
                                        })
                                        .catch((error) => {
                                            console.log(error.message)
                                        });
                                }
                                else {
                                    dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                    let appliedStudentsArr = [];
                                    firebase.database().ref('companyUsers/' + currentUserUid + "/").once('value')
                                        .then((appliedStudents) => {
                                            let allUsersArr = appliedStudents.val();
                                            dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                            appliedStudents.forEach(element => {
                                                let item = element.val();
                                                // item.id = element.key;
                                                // item.id = currentUserUid;
                                                appliedStudentsArr.push(item);
                                            })
                                            dispatch({ type: ActionTypes.APPLIED_STUDENTS, payload: appliedStudentsArr });
                                        });
                                    let allStudents = [];
                                    firebase.database().ref('students/').once('value')
                                        .then((students) => {
                                            students.forEach(element => {
                                                let item = element.val();
                                                item.id = element.key;
                                                allStudents.push(item);
                                            })
                                            dispatch({ type: ActionTypes.ALL_STUDENTS, payload: allStudents });
                                        })
                                    history.push('/companyHome');
                                }
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}


export function signupstudent(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('students/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('students/').once('value')
                            .then((userData) => {
                                firebase.database().ref('students/' + createdUser.uid + '/').once('value')
                                    .then((user) => {
                                        dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    });
                                let currentUserUid = firebase.auth().currentUser.uid;
                                let allCompanyMembers = [];
                                let appliedCompaniesArr = [];
                                firebase.database().ref('companyUsers/' + createdUser.uid + '/').once('value')
                                    .then((appliedCompanies) => {
                                        appliedCompanies.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            appliedCompaniesArr.push(item);
                                        })
                                        dispatch({ type: ActionTypes.APPLIED_COMPANIES, payload: appliedCompaniesArr });
                                    });
                                firebase.database().ref('companyUsers/').once('value')
                                    .then((companyUsers) => {
                                        companyUsers.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            allCompanyMembers.push(item);
                                        })
                                        dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: allCompanyMembers });
                                    })

                                let allUsersArr = [];
                                userData.forEach(element => {
                                    let item = element.val();
                                    item.id = element.key;
                                    if (item.id !== user.uid)
                                        allUsersArr.push(item);
                                });
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                history.push('/studentHome');
                            })
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}




export function signinstudent(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('students/').once('value')
                    .then((userData) => {
                        let currentUserUid = firebase.auth().currentUser.uid;
                        firebase.database().ref('students/' + signedinUser.uid + '/').once('value')
                            .then((user) => {
                                if (!userData.hasChild(signedinUser.uid)) {
                                    alert('No Student Found on this Email ID!')
                                    firebase.auth().signOut()
                                        .then(() => {
                                            dispatch({ type: ActionTypes.USER_LOGOUT });
                                            history.push('/');
                                        })
                                        .catch((error) => {
                                            console.log(error.message)
                                        });
                                }
                                else {
                                    dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    let appliedCompaniesArr = [];
                                    firebase.database().ref('companyUsers/' + currentUserUid + '/').once('value')
                                        .then((appliedCompanies) => {
                                            appliedCompanies.forEach(element => {
                                                let item = element.val();
                                                item.id = element.key;
                                                appliedCompaniesArr.push(item);
                                            })
                                            dispatch({ type: ActionTypes.APPLIED_COMPANIES, payload: appliedCompaniesArr });
                                        });
                                    let allCompanyMembers = [];
                                    firebase.database().ref('companyUsers/').once('value')
                                        .then((companyUsers) => {
                                            companyUsers.forEach(element => {
                                                let item = element.val();
                                                item.id = element.key;
                                                allCompanyMembers.push(item);
                                            })
                                            dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: allCompanyMembers });
                                        })
                                    let allUsersArr = [];
                                    userData.forEach(element => {
                                        let item = element.val();
                                        item.id = element.key;
                                        if (item.id !== currentUserUid)
                                            allUsersArr.push(item);
                                    });
                                    dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                                    dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                    history.push('/studentHome');
                                }
                            })
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

export function removeStudent(userId) {
    return dispatch => {
        let obj = [];
        firebase.database().ref('students/' + userId).remove();
        firebase.database().ref('students/').once('value')
            .then((studentsData) => {
                studentsData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    obj.push(item);
                });
                dispatch({ type: ActionTypes.ALL_STUDENTS, payload: obj });
            });
    }
}

export function removeCompany(userId) {
    return dispatch => {
        let obj = [];
        firebase.database().ref('companyUsers/' + userId).remove();
        firebase.database().ref('companyUsers/').once('value')
            .then((companyData) => {
                companyData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    obj.push(item);
                });
                dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: obj });
            });
    }
}

export function apply(studentID, companyID) {
    return dispatch => {
        let obj = [];
        firebase.database().ref('companyUsers/' + companyID + "/" + studentID).update({ applied: 'applied' })
            .then(() => {
                dispatch({ type: ActionTypes })
            })
        firebase.database().ref('companyUsers/').once('value')
            .then((companyData) => {
                companyData.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    obj.push(item);
                });
                dispatch({ type: ActionTypes.ALL_COMPANY_USERS, payload: obj });
            });
    }
}