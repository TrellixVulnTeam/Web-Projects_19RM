localStorage.removeItem("userData");
var database = firebase.database().ref("/");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var emailDiv = document.getElementById("emailDiv");
var passDiv = document.getElementById("passDiv");
var birthday = document.getElementById("birthday");
var genderMale = document.getElementById("male");
var genderFemale = document.getElementById("female");
var num = document.getElementById("num")
var country = document.getElementById("country");
var mainDiv = document.getElementById("body");
var genderDiv = document.getElementById("genderDiv");
var birthdayDiv = document.getElementById("birthdayDiv");
var contactDiv = document.getElementById("contactDiv");
var firstNameDiv = document.getElementById("firstNameDiv");
var lastNameDiv = document.getElementById("lastNameDiv");
var input = document.querySelector('input[name="date"]');
var genderVal;
var picker = datepicker(input);
input.addEventListener('change', () => {
      console.log('change', input.value);
    });
    input.addEventListener('input', () => {
      console.log('input', input.value);
    });
var picker = datepicker(input,{
            animation: {
                duration: 200,
                easing:   'cubic-bezier(0.86, 0, 0.07, 1)'
            },
            behavior: {
                closeOnSelect: true
            },
            callbacks: {
                onSelect:     null,
                onOpen:       null,
                onClose:      null,
                onChangeView: null
            },
            classNames: {
                block:              'datepicker',
                elementCalendar:    'calendar',
                elementDay:         'day',
                elementWeek:        'week',
                elementMonth:       'month',
                elementHeader:      'header',
                elementMarker:      'marker',
                elementButton:      'button',
                elementButtonGroup: 'button-group',
                elementHeading:     'heading',
                modifierActive:     'active',
                modifierToday:      'today',
                modifierSelected:   'selected',
                modifierPadding:    'padding',
                modifierWeekend:    'weekend',
                modifierNextMonth:  'next-month',
                modifierPrevMonth:  'prev-month',
                modifierNextYear:   'next-year',
                modifierPrevYear:   'prev-year',
                delineatorElement:  '_',
                delineatorModifier: '__'
            },
            transform: {
                input: value => moment(value, 'YYYY/MM/DD').toISOString(),
                output: value => moment(value).format('YYYY/MM/DD')
            }
        });
        
document.getElementById("submitBtn").addEventListener("click",function() {
    if(firstName.value == "" || lastName.value == "" || email.value == "" || password.value == "" || birthday.value == "" || num.value == "" || country.value == "" || (genderMale.checked == false && genderFemale.checked == false)){
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
    if(password.classList.contains("is-invalid")){
        password.classList.remove("is-invalid");
        passDiv.removeChild(passSDiv);
    }
    if(email.classList.contains("is-invalid")){
        email.classList.remove("is-invalid");
        emailDiv.removeChild(emailSDiv);
    }
    if(num.classList.contains("is-invalid")){
        num.classList.remove("is-invalid");
        contactDiv.removeChild(contactSDiv);
    }
    if(firstName.classList.contains("is-invalid")){
        firstName.classList.remove("is-invalid");
        firstNameDiv.removeChild(firstNameSDiv);
    }
    if(lastName.classList.contains("is-invalid")){
        lastName.classList.remove("is-invalid");
        lastNameDiv.removeChild(lastNameSDiv);
    }
    if(!(String(num.value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && ! (String(num.value).match(/0{5,}/)))){
        alertBox("alert alert-danger","Enter a Valid Contact Number!");
        num.classList.add("is-invalid");
        contactSDiv = document.createElement("div");
        contactSDiv.className = 'invalid-feedback';
        contactSDiv.appendChild(document.createTextNode("Please Enter Correct Format i.e. (+923121234567)"));
        contactDiv.appendChild(contactSDiv);
        return;
    }
    if(!(/^[A-Za-z\s]+$/.test(firstName.value))){
        alertBox("alert alert-danger","Enter a Valid Name!");
        firstName.classList.add("is-invalid");
        firstNameSDiv = document.createElement("div");
        firstNameSDiv.className = 'invalid-feedback';
        firstNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        firstNameDiv.appendChild(firstNameSDiv);
        return;
    }
    if(!(/^[A-Za-z\s]+$/.test(lastName.value))){
        alertBox("alert alert-danger","Enter a Valid Name!");
        lastName.classList.add("is-invalid");
        lastNameSDiv = document.createElement("div");
        lastNameSDiv.className = 'invalid-feedback';
        lastNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        lastNameDiv.appendChild(lastNameSDiv);
        return;
    }
    // if(birthday.classList.contains("is-invalid")){
    //     birthday.classList.remove("is-invalid");
    //     birthdayDiv.removeChild(birthdaySDiv);
    // }
    // if(!(isValidDate(input.value))){
    //     return;
    // }
    if(genderMale.checked == true){
        genderVal = genderMale.value;
    }
    else{
        genderVal = genderFemale.value;
    }
    
    var user = {
        firstName: toTitleCase(firstName.value),
        lastName: toTitleCase(lastName.value),
        email: email.value,
        password: password.value,
        birthday : birthday.value,
        gender : genderVal,
        num : num.value,
        country : country.value
    }

    console.log(user);


    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function (ref) {
            console.log(ref);
            database.child("users/"+ ref.uid).set(user)
            .then(function(){
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(function (success) {
                    database.child("users/" + success.uid).once("value", function (snapshot) {
                        var obj = snapshot.val();
                        obj.id = snapshot.key;
                        localStorage.setItem("userData" , JSON.stringify(obj));
                        alertBox("alert alert-success","Account created successfully!");
                        window.location = "home/home.html";
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alertBox('alert alert-danger','Wrong password.');
                        password.classList.add("is-invalid");
                        passSDiv = document.createElement("div");
                        passSDiv.className = 'invalid-feedback';
                        passSDiv.appendChild(document.createTextNode("Please enter correct password!"));
                        passDiv.appendChild(passSDiv);
                    } else {
                        alertBox('alert alert-danger',errorMessage);
                        email.classList.add("is-invalid");
                        emailSDiv = document.createElement("div");
                        emailSDiv.className = 'invalid-feedback';
                        emailSDiv.appendChild(document.createTextNode("Please enter correct email address!"));
                        emailDiv.appendChild(emailSDiv);
                    }
                    console.log(error);
                });
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alertBox('alert alert-danger','The password is too weak.');
                password.classList.add("is-invalid");
                passSDiv = document.createElement("div");
                passSDiv.className = 'invalid-feedback';
                passSDiv.appendChild(document.createTextNode("Password must be minimum of 8 characters long!"));
                passDiv.appendChild(passSDiv);
            } else {
                alertBox('alert alert-danger',errorMessage);
                email.classList.add("is-invalid");
                emailSDiv = document.createElement("div");
                emailSDiv.className = 'invalid-feedback';
                emailSDiv.appendChild(document.createTextNode("Please enter correct email address!"));
                emailDiv.appendChild(emailSDiv);
            }
            console.log(error);
        });
});


function signIn(){
    window.location = "login/login.html";
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

// function isValidDate(str){
//     // STRING FORMAT yyyy/mm/dd
// 	if(str=="" || str==null){return false;}								
	
// 	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
//     // var m = String(str).match(/(\d{4})([\/]\d{2})([\/]\d{2})/);
//     var m = String(str).match(/(\d{4})(-\d{2})(-\d{2})/);
	
//     // STR IS NOT FIT m IS NOT OBJECT
    
// 	if(m === null ||  typeof m !== 'object'){
//         invalidDate("Enter Date in correct format i.e. yyyy/mm/dd!");
//         console.log("m is not obj");
//         return false;
//     }				
	
// 	// CHECK m TYPE
// 	if (typeof m !== 'object' && m !== null && m.size!==3){
//         invalidDate("Enter Date in correct format i.e. yyyy/mm/dd!");
//         console.log("m type error");
//         return false;
//     }
				
// 	// var ret = true; //RETURN VALUE						
// 	var thisYear = new Date().getFullYear(); //YEAR NOW
// 	var minYear = 1900; //MIN YEAR
	
// 	// YEAR CHECK
// 	if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear){
//         invalidDate("Enter Valid Year! (1900-current)");
//         return false;
//     }
// 	// MONTH CHECK			
// 	if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){
//         invalidDate("Enter Valid Month!");
//         return false;
//     }
//     // FEBRUARY CHECK
//     if( (m[2] == 2 && m[3] > 29) || (m[2] == 2 && m[3] > 28 && m[1]%4 != 0)){
//         invalidDate("Enter Valid February Date!");
//         return false;
//     }
//     // DAY CHECK
//     if( (m[3].length < 2) || m[3] < 1 || ((["04","06","09","11"].indexOf(m[2]) > -1 && m[3] > 30 ) || m[3] > 31)){
//         invalidDate("Enter Valid Date!");
//         return false;
//     }
// 	// // DAY CHECK
// 	// if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){ret = false;}
    
// 	return true;			
// }

// function invalidDate(errorMessage){
//     alertBox('alert alert-danger','Input Correct Date Format!');
//     birthday.classList.add("is-invalid");
//     birthdaySDiv = document.createElement("div");
//     birthdaySDiv.className = 'invalid-feedback';
//     birthdaySDiv.appendChild(document.createTextNode(errorMessage));
//     birthdayDiv.appendChild(birthdaySDiv);
//     return;
// }
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
