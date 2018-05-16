document.getElementById('register-btn').addEventListener("click", function (event) {
    event.preventDefault();
    window.location = 'register/becomeachef.html'
})

var signInPassDiv = document.getElementById('signInPassDiv');
var signInEmailDiv = document.getElementById('signInEmailDiv');
var signInDiv = document.getElementById('signInBody')
var signInEmail = document.getElementById('user-email');
var signInPassword = document.getElementById('user-password');
var userSelected = document.getElementById('user');
var chefSelected = document.getElementById('chef');
var msgDiv = document.getElementById('msgBody');
var msg_userName = document.getElementById('msg-userName');
var msg_userMail = document.getElementById('msg-userMail');
var msg_userMsg = document.getElementById('msg-userMsg');
var msg_userNameDiv = document.getElementById('msg-userNameDiv');
var msg_userMailDiv = document.getElementById('msg-userMailDiv');
var msg_userMsgDiv = document.getElementById('msg-userMsgDiv');

function signIn(e) {
    if (signInEmail.value == "" || signInPassword.value == "" || (userSelected.checked == false && chefSelected.checked == false)) {
        signInDiv.classList.add("was-validated");
        document.addEventListener('invalid', (function () {
            return function (e) {
                e.preventDefault();
            };
        })(), true);
        if (!signInEmail.classList.contains("is-invalid") && (signInEmail.value == "")) {
            signInEmail.classList.add("is-invalid");
            emailSDiv = document.createElement("div");
            emailSDiv.className = 'invalid-feedback';
            emailSDiv.appendChild(document.createTextNode("Please enter your email address!"));
            signInEmailDiv.appendChild(emailSDiv);
        }
        else {
            if (!signInEmail.value == "" && signInEmail.classList.contains("is-invalid")) {
                signInEmail.classList.remove("is-invalid");
                signInEmail.classList.add("is-valid");
                signInEmailDiv.removeChild(emailSDiv);
            }
        }
        if (!signInPassword.classList.contains("is-invalid") && (signInPassword.value == "")) {
            signInPassword.classList.add("is-invalid");
            passSDiv = document.createElement("div");
            passSDiv.className = 'invalid-feedback';
            passSDiv.appendChild(document.createTextNode("Please enter your password!"));
            signInPassDiv.appendChild(passSDiv);
        }
        else {
            if (!signInPassword.value == "" && signInPassword.classList.contains("is-invalid")) {
                signInPassword.classList.remove("is-invalid");
                signInPassword.classList.add("is-valid");
                signInPassDiv.removeChild(passSDiv);
            }
        }
        return;
    }
    if (signInDiv.classList.contains("was-validated")) {
        signInDiv.classList.remove("was-validated");
    }
    if (signInPassword.classList.contains("is-invalid")) {
        signInPassword.classList.remove("is-invalid");
        signInPassDiv.removeChild(passSDiv);
    }
    if (signInEmail.classList.contains("is-invalid")) {
        signInEmail.classList.remove("is-invalid");
        signInEmailDiv.removeChild(emailSDiv);
    }
    alert('signin successful!')
}

var count = 1;
document.getElementById('inc-btn-1').addEventListener('click', function () {
    document.getElementById('quantity').innerHTML =  ++count;
    console.log(document.getElementById('quantity').value)
    console.log(document.getElementById('quantity').value)
})

function submitMsg(e) {
    if (msg_userMail.value == "" || msg_userName.value == "" || msg_userMsg.value == "") {
        msgDiv.classList.add("was-validated");
        document.addEventListener('invalid', (function () {
            return function (e) {
                e.preventDefault();
            };
        })(), true);
        if (!msg_userMail.classList.contains("is-invalid") && (msg_userMail.value == "")) {
            msg_userMail.classList.add("is-invalid");
            msg_userMailSDiv = document.createElement("div");
            msg_userMailSDiv.className = 'invalid-feedback';
            msg_userMailSDiv.appendChild(document.createTextNode("Please enter your email address!"));
            msg_userMailDiv.appendChild(msg_userMailSDiv);
        }
        else {
            if (!msg_userMail.value == "" && msg_userMail.classList.contains("is-invalid")) {
                msg_userMail.classList.remove("is-invalid");
                msg_userMail.classList.add("is-valid");
                msg_userMailDiv.removeChild(msg_userMailSDiv);
            }
        }
        if (!msg_userMsg.classList.contains("is-invalid") && (msg_userMsg.value == "")) {
            msg_userMsg.classList.add("is-invalid");
            msg_userMsgSDiv = document.createElement("div");
            msg_userMsgSDiv.className = 'invalid-feedback';
            msg_userMsgSDiv.appendChild(document.createTextNode("Please enter your message!"));
            msg_userMsgDiv.appendChild(msg_userMsgSDiv);
        }
        else {
            if (!msg_userMsg.value == "" && msg_userMsg.classList.contains("is-invalid")) {
                msg_userMsg.classList.remove("is-invalid");
                msg_userMsg.classList.add("is-valid");
                msg_userMsgDiv.removeChild(msg_userMsgSDiv);
            }
        }
        if (!msg_userName.classList.contains("is-invalid") && (msg_userName.value == "")) {
            msg_userName.classList.add("is-invalid");
            msg_userNameSDiv = document.createElement("div");
            msg_userNameSDiv.className = 'invalid-feedback';
            msg_userNameSDiv.appendChild(document.createTextNode("Please enter your Name!"));
            msg_userNameDiv.appendChild(msg_userNameSDiv);
        }
        else {
            if (!msg_userName.value == "" && msg_userName.classList.contains("is-invalid")) {
                msg_userName.classList.remove("is-invalid");
                msg_userName.classList.add("is-valid");
                msg_userNameDiv.removeChild(msg_userNameSDiv);
            }
        }
        return;
    }
    if (msgDiv.classList.contains("was-validated")) {
        msgDiv.classList.remove("was-validated");
    }
    if (msg_userName.classList.contains("is-invalid")) {
        msg_userName.classList.remove("is-invalid");
        msg_userNameDiv.removeChild(msg_userNameSDiv);
    }
    if (msg_userMail.classList.contains("is-invalid")) {
        msg_userMail.classList.remove("is-invalid");
        msg_userMailDiv.removeChild(msg_userMailSDiv);
    }
    if (msg_userMsg.classList.contains("is-invalid")) {
        msg_userMsg.classList.remove("is-invalid");
        msg_userMsgDiv.removeChild(msg_userMsgSDiv);
    }
    alert('successful!')
}