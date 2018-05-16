if(localStorage.getItem("userData") == null){
    alertBox("alert alert-danger","LogIn First!")
    window.location = "../login/login.html";
}
var database = firebase.database().ref("/")
var user = JSON.parse(localStorage.getItem("userData"));
var userName = document.getElementById("userName");
var email = document.getElementById("email");
var birthday = document.getElementById("birthday");
var gender = document.getElementById("gender");
var dua = document.getElementById("dua");
var num = document.getElementById("num");
var country = document.getElementById("country");
var duaFor = document.getElementById("duaFor");
var duaField = document.getElementById("duaField");
var duaReason = document.getElementById("duaReason");
var duaSection = document.getElementById("duaSection");
var duaDiv = document.getElementById("duaDiv");
var mainDiv = document.getElementById("body");
console.log(user);
num.innerHTML = user.num;
userName.innerHTML = user.firstName + " " + user.lastName;
email.innerHTML = user.email;
birthday.innerHTML = user.birthday;
gender.innerHTML = user.gender;
country.innerHTML = user.country;
document.getElementById("user").innerHTML = user.firstName + " " + user.lastName;


function submitDua(){
if(dua.value == "" || duaFor.value == ""){
    if(!dua.classList.contains("is-invalid") && (dua.value == "")){
        dua.classList.add("is-invalid");
        duaSDiv = document.createElement("div");
        duaSDiv.className = 'invalid-feedback';
        duaSDiv.appendChild(document.createTextNode("Please submit your Dua first!"));
        duaSection.appendChild(duaSDiv);
    }
    else{
        if(!dua.value == "" && dua.classList.contains("is-invalid")){
            dua.classList.remove("is-invalid");
            dua.classList.add("is-valid");
            duaSection.removeChild(duaSDiv);
        }
    }    
    if(!duaFor.classList.contains("is-invalid") && (duaFor.value == "")){
        duaFor.classList.add("is-invalid");
        duaRDiv = document.createElement("div");
        duaRDiv.className = 'invalid-feedback';
        duaRDiv.appendChild(document.createTextNode("Please submit the reason for your Dua!"));
        duaReason.appendChild(duaRDiv);
    }
    else{
        if(!duaFor.value == "" && duaFor.classList.contains("is-invalid")){
            duaFor.classList.remove("is-invalid");
            duaFor.classList.add("is-valid");
            duaReason.removeChild(duaRDiv);
        }
    }
    return;
}
if(duaFor.classList.contains("is-invalid")){
    duaFor.classList.remove("is-invalid");
}
if(dua.classList.contains("is-invalid")){
    dua.classList.remove("is-invalid");
}
var userDua ={
    name : user.firstName + " " + user.lastName,
    dua : dua.value,
    duaFor : duaFor.value,
}
console.log(dua.value)

database.child("post").push(userDua);
dua.value = "";
duaFor.value = "";
alertBox("alert alert-success","Dua submitted successfully!");
}

function showPrayers(){
    window.location = "../prayers/prayers.html"
}

function logout(){
    localStorage.removeItem("userData");
    window.location = "../login/login.html";
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