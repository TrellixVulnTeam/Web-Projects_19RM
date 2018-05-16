localStorage.removeItem("userData");
var database = firebase.database().ref("/");
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var mainDiv = document.getElementById("body");
var emailDiv = document.getElementById("emailDiv");
var passDiv = document.getElementById("passDiv");
document.getElementById("submitBtn").addEventListener("click",function(){
// event.preventDefault();
if(signInEmail.value == "" || signInPassword.value == "" ){
    alertBox("alert alert-danger","Please fill all the fields!");
    mainDiv.classList.add("was-validated");
    document.addEventListener('invalid', (function(){
        return function(e){
            e.preventDefault();
        };
    })(), true);
    return;
}
if(mainDiv.classList.contains("was-validated")){
    mainDiv.classList.remove("was-validated");
}
if(signInPassword.classList.contains("is-invalid")){
    signInPassword.classList.remove("is-invalid");
    passDiv.removeChild(passSDiv);
}
if(signInEmail.classList.contains("is-invalid")){
    signInEmail.classList.remove("is-invalid");
    emailDiv.removeChild(emailSDiv);
}
var user = {
    email: signInEmail.value,
    password: signInPassword.value
}
firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(function (success) {
        database.child("users/" + success.uid).once("value", function (snapshot) {
            var obj = snapshot.val();
            obj.id = snapshot.key;
            localStorage.setItem("userData" , JSON.stringify(obj));
            window.location = "../home/home.html"
        })
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alertBox("alert alert-danger",'Wrong password.');
            signInPassword.classList.add("is-invalid");
            passSDiv = document.createElement("div");
            passSDiv.className = 'invalid-feedback';
            passSDiv.appendChild(document.createTextNode("Please enter correct password!"));
            passDiv.appendChild(passSDiv);
        } else {
            alertBox("alert alert-danger",errorMessage);
            signInEmail.classList.add("is-invalid");
            emailSDiv = document.createElement("div");
            emailSDiv.className = 'invalid-feedback';
            emailSDiv.appendChild(document.createTextNode("Please enter correct e-mail address!"));
            emailDiv.appendChild(emailSDiv);
        }
        console.log(error);
    });
})

function signUp(){
    window.location = "../index.html";
}

interval = null;
function alertBox(classValue,textValue){
    var chk = document.getElementById("alertDiv");
    if(document.body.contains(chk)){
        document.body.removeChild(chk);
        clearTimeout(interval);
    }
    var alertDiv = document.createElement("div");
    alertDiv.className = "container " + classValue;
    alertDiv.setAttribute("role","alert");
    alertDiv.setAttribute("id","alertDiv")
    alertDiv.appendChild(document.createTextNode(textValue));    
    var startTime = new Date().getTime();
    interval = setInterval(function(){
        if(new Date().getTime() - startTime > 4000){
            document.body.removeChild(alertDiv);
            clearTimeout(interval);
            return;
        }
           document.body.insertBefore(alertDiv,mainDiv);
           
    }, 20);  
    return;
}