import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCgg5CZo8g1fhoXRJuDrtiSW-ntYQLwZJw",
    authDomain: "test-f23d8.firebaseapp.com",
    databaseURL: "https://test-f23d8.firebaseio.com",
    projectId: "test-f23d8",
    storageBucket: "test-f23d8.appspot.com",
    messagingSenderId: "823127592687"
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
                                let currentUserUid = firebase.auth().currentUser.uid;
                                firebase.database().ref('users/' + createdUser.uid + '/').once('value')
                                    .then((user) => {
                                        dispatch({ type: ActionTypes.USERNAME, payload: user.val().username });
                                    });
                                dispatch({ type: ActionTypes.CHANGERECPUID, payload: currentUserUid });
                                let obj = [];
                                firebase.database().ref('users/' + createdUser.uid + "/todo/").once('value')
                                    .then((todoData) => {
                                        todoData.forEach(element => {
                                            let item = element.val();
                                            item.id = element.key;
                                            obj.push(item);
                                        });
                                        dispatch({ type: ActionTypes.UPDATE_TODO, payload: obj });
                                        history.push('/home');
                                    });
                            });
                    });
            })
            .catch((err) => {
                console.log(err);
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
                        dispatch({ type: ActionTypes.CHANGERECPUID, payload: currentUserUid });
                        let obj = [];
                        firebase.database().ref('users/' + signedinUser.uid + "/todo/").once('value')
                            .then((todoData) => {
                                todoData.forEach(element => {
                                    let item = element.val();
                                    item.id = element.key;
                                    obj.push(item);
                                });
                                dispatch({ type: ActionTypes.UPDATE_TODO, payload: obj })
                                history.push('/home');
                            });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export function logout() {
    return dispatch => {
        dispatch({ type: ActionTypes.USER_LOGOUT });
        history.push('/');
    }
}

export function addTodo(todoVal, userId) {
    return dispatch => {
        let obj = [];
        firebase.database().ref('/users/' + userId + "/todo").push({ todoVal });
        firebase.database().ref('/users/' + userId + "/todo").once('value')
            .then((snap) => {
                snap.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    obj.push(item);
                });
                // obj = snap.val();
                // obj.id = snap.key;
                dispatch({ type: ActionTypes.UPDATE_TODO, payload: obj });
            });
    }
}

    export function removeTodo(todoId, userId) {
        return dispatch => {
            let obj = [];
            firebase.database().ref('/users/' + userId + "/todo/" + todoId).remove();
            firebase.database().ref('users/' + userId + "/todo/").once('value')
                .then((todoData) => {
                    todoData.forEach(element => {
                        let item = element.val();
                        item.id = element.key;
                        obj.push(item);
                    });
                    dispatch({ type: ActionTypes.UPDATE_TODO, payload: obj });
                });
        }
    }

export function removeAllTodo(userId) {
    return dispatch => {
        firebase.database().ref('/users/' + userId + "/todo").remove();
        dispatch({ type: ActionTypes.REMOVE_TODO });
    }
}

export function editTodoVal(newVal, userId, todoArr) {
    return dispatch => {
        firebase.database().ref('/users/' + userId + '/todo/' + newVal.id).update({ todoVal: newVal.val });
        // for (let i = 0; i < todoArr.length; i++) {
        //     if (todoArr[i]['id'] === newVal['id']) {
        //         todoArr[i]['todoVal'] = newVal['val'];
        //     }
        // }
        // dispatch({ type: ActionTypes.UPDATE_TODO, payload: todoArr });
        let obj = [];
        firebase.database().ref('/users/' + userId + "/todo").once('value')
            .then((snap) => {
                snap.forEach(element => {
                    let item = element.val();
                    item.id = element.key;
                    obj.push(item);
                });
                // obj = snap.val();
                // obj.id = snap.key;
                dispatch({ type: ActionTypes.UPDATE_TODO, payload: obj });
            });
    }
}
