localStorage.removeItem("userData");
var database = firebase.database().ref("/");
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var signInEmailDiv = document.getElementById("signInEmailDiv");
var signInPassDiv = document.getElementById("signInPassDiv");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var emailDiv = document.getElementById("signUpEmailDiv");
var passDiv = document.getElementById("signUpPassDiv");
var birthday = document.getElementById("birthday");
var genderMale = document.getElementById("male");
var genderFemale = document.getElementById("female");
var num = document.getElementById("num")
var country = document.getElementById("country");
var signUpDiv = document.getElementById("signUpBody");
var signInDiv = document.getElementById("signInBody");
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
    function signIn(){
            if(signInEmail.value == "" || signInPassword.value == "" ){
                signInDiv.classList.add("was-validated");
                document.addEventListener('invalid', (function(){
                    return function(e){
                        e.preventDefault();
                    };
                })(), true);
                if(!signInEmail.classList.contains("is-invalid") && (signInEmail.value == "")){
                    signInEmail.classList.add("is-invalid");
                    emailSDiv = document.createElement("div");
                    emailSDiv.className = 'invalid-feedback';
                    emailSDiv.appendChild(document.createTextNode("Please enter your email address!"));
                    signInEmailDiv.appendChild(emailSDiv);
                }
                else{
                    if(!signInEmail.value == "" && signInEmail.classList.contains("is-invalid")){
                        signInEmail.classList.remove("is-invalid");
                        signInEmail.classList.add("is-valid");
                        signInEmailDiv.removeChild(emailSDiv);
                    }
                }
                if(!signInPassword.classList.contains("is-invalid") && (signInPassword.value == "")){
                    signInPassword.classList.add("is-invalid");
                    passSDiv = document.createElement("div");
                    passSDiv.className = 'invalid-feedback';
                    passSDiv.appendChild(document.createTextNode("Please enter your password!"));
                    signInPassDiv.appendChild(passSDiv);
                }
                else{
                    if(!signInPassword.value == "" && signInPassword.classList.contains("is-invalid")){
                        signInPassword.classList.remove("is-invalid");
                        signInPassword.classList.add("is-valid");
                        signInPassDiv.removeChild(passSDiv);
                    }
                }
                return;
            }
            if(signInDiv.classList.contains("was-validated")){
                signInDiv.classList.remove("was-validated");
            }
            if(signInPassword.classList.contains("is-invalid")){
                signInPassword.classList.remove("is-invalid");
                signInPassDiv.removeChild(passSDiv);
            }
            if(signInEmail.classList.contains("is-invalid")){
                signInEmail.classList.remove("is-invalid");
                signInEmailDiv.removeChild(emailSDiv);
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
                        window.location = "home/home.html"
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        signInPassword.classList.add("is-invalid");
                        passSDiv = document.createElement("div");
                        passSDiv.className = 'invalid-feedback';
                        passSDiv.appendChild(document.createTextNode("Please enter correct password!"));
                        signInPassDiv.appendChild(passSDiv);
                    } else {
                        signInEmail.classList.add("is-invalid");
                        emailSDiv = document.createElement("div");
                        emailSDiv.className = 'invalid-feedback';
                        emailSDiv.appendChild(document.createTextNode("Please enter correct e-mail address!"));
                        signInEmailDiv.appendChild(emailSDiv);
                    }
                    console.log(error);
                });
            }


function signUp() {
    if(!firstName.classList.contains("is-invalid") && (firstName.value == "")){
        firstName.classList.add("is-invalid");
        firstNameSDiv = document.createElement("div");
        firstNameSDiv.className = 'invalid-feedback';
        firstNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
        firstNameDiv.appendChild(firstNameSDiv);
    }
    else{
        if(!firstName.value == "" && firstName.classList.contains("is-invalid")){
            firstName.classList.remove("is-invalid");
            firstName.classList.add("is-valid");
            firstNameDiv.removeChild(firstNameSDiv);
        }
    }
    if(!lastName.classList.contains("is-invalid") && (lastName.value == "")){
        lastName.classList.add("is-invalid");
        lastNameSDiv = document.createElement("div");
        lastNameSDiv.className = 'invalid-feedback';
        lastNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
        lastNameDiv.appendChild(lastNameSDiv);
    }
    else{
        if(!lastName.value == "" && lastName.classList.contains("is-invalid")){
            lastName.classList.remove("is-invalid");
            lastName.classList.add("is-valid");
            lastNameDiv.removeChild(lastNameSDiv);
        }
    }
    if(!email.classList.contains("is-invalid") && (email.value == "")){
        email.classList.add("is-invalid");
        signUpEmailSDiv = document.createElement("div");
        signUpEmailSDiv.className = 'invalid-feedback';
        signUpEmailSDiv.appendChild(document.createTextNode("Please enter an email address!"));
        emailDiv.appendChild(signUpEmailSDiv);
    }
    else{
        if(!email.value == "" && email.classList.contains("is-invalid")){
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            emailDiv.removeChild(signUpEmailSDiv);
        }
    }
    if(!password.classList.contains("is-invalid") && (password.value == "")){
        password.classList.add("is-invalid");
        signUpPasswordSDiv = document.createElement("div");
        signUpPasswordSDiv.className = 'invalid-feedback';
        signUpPasswordSDiv.appendChild(document.createTextNode("Please enter your password!"));
        passDiv.appendChild(signUpPasswordSDiv);
    }
    else{
        if(!password.value == "" && password.classList.contains("is-invalid")){
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
            passDiv.removeChild(signUpPasswordSDiv);
        }
    }
    if(!birthday.classList.contains("is-invalid") && (birthday.value == "")){
        birthday.classList.add("is-invalid");
        birthdaySDiv = document.createElement("div");
        birthdaySDiv.className = 'invalid-feedback';
        birthdaySDiv.appendChild(document.createTextNode("Please enter your date of birth!"));
        birthdayDiv.appendChild(birthdaySDiv);
    }
    else{
        if(!birthday.value == "" && birthday.classList.contains("is-invalid")){
            birthday.classList.remove("is-invalid");
            birthday.classList.add("is-valid");
            birthdayDiv.removeChild(birthdaySDiv);
        }
    }
    if(!num.classList.contains("is-invalid") && (num.value == "")){
        num.classList.add("is-invalid");
        contactSDiv = document.createElement("div");
        contactSDiv.className = 'invalid-feedback';
        contactSDiv.appendChild(document.createTextNode("Please enter your contact number!"));
        contactDiv.appendChild(contactSDiv);
    }
    else{
        if(!num.value == "" && num.classList.contains("is-invalid")){
            num.classList.remove("is-invalid");
            num.classList.add("is-valid");
            contactDiv.removeChild(contactSDiv);
        }
    }
    if(!(genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid")) && (genderMale.checked == false && genderFemale.checked == false)){
        genderMale.classList.add("is-invalid");
        genderFemale.classList.add("is-invalid");
        genderSDiv = document.createElement("div");
        genderSDiv.className = 'invalid-feedback';
        genderSDiv.appendChild(document.createTextNode("Please select your gender!"));
        genderDiv.appendChild(genderSDiv);
    }
    else{
        if(!(genderMale.checked == false && genderFemale.checked == false) && (genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid"))){
            genderMale.classList.remove("is-invalid");
            genderFemale.classList.remove("is-invalid");
            genderMale.classList.add("is-valid");
            genderFemale.classList.add("is-valid");
            genderDiv.removeChild(genderSDiv);
        }
    }
    if(firstName.value == "" || lastName.value == "" || email.value == "" || password.value == "" || birthday.value == "" || num.value == "" || country.value == "" || (genderMale.checked == false && genderFemale.checked == false)){
        signUpDiv.classList.add("was-validated");
        document.addEventListener('invalid', (function(){
            return function(e){
                e.preventDefault();
            };
        })(), true);
        if(!firstName.classList.contains("is-invalid") && (firstName.value == "")){
            firstName.classList.add("is-invalid");
            firstNameSDiv = document.createElement("div");
            firstNameSDiv.className = 'invalid-feedback';
            firstNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
            firstNameDiv.appendChild(firstNameSDiv);
        }
        else{
            if(!firstName.value == "" && firstName.classList.contains("is-invalid")){
                firstName.classList.remove("is-invalid");
                firstName.classList.add("is-valid");
                firstNameDiv.removeChild(firstNameSDiv);
            }
        }
        if(!lastName.classList.contains("is-invalid") && (lastName.value == "")){
            lastName.classList.add("is-invalid");
            lastNameSDiv = document.createElement("div");
            lastNameSDiv.className = 'invalid-feedback';
            lastNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
            lastNameDiv.appendChild(lastNameSDiv);
        }
        else{
            if(!lastName.value == "" && lastName.classList.contains("is-invalid")){
                lastName.classList.remove("is-invalid");
                lastName.classList.add("is-valid");
                lastNameDiv.removeChild(lastNameSDiv);
            }
        }
        if(!email.classList.contains("is-invalid") && (email.value == "")){
            email.classList.add("is-invalid");
            signUpEmailSDiv = document.createElement("div");
            signUpEmailSDiv.className = 'invalid-feedback';
            signUpEmailSDiv.appendChild(document.createTextNode("Please enter an email address!"));
            emailDiv.appendChild(signUpEmailSDiv);
        }
        else{
            if(!email.value == "" && email.classList.contains("is-invalid")){
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
                emailDiv.removeChild(signUpEmailSDiv);
            }
        }
        if(!password.classList.contains("is-invalid") && (password.value == "")){
            password.classList.add("is-invalid");
            signUpPasswordSDiv = document.createElement("div");
            signUpPasswordSDiv.className = 'invalid-feedback';
            signUpPasswordSDiv.appendChild(document.createTextNode("Please enter your password!"));
            passDiv.appendChild(signUpPasswordSDiv);
        }
        else{
            if(!password.value == "" && password.classList.contains("is-invalid")){
                password.classList.remove("is-invalid");
                password.classList.add("is-valid");
                passDiv.removeChild(signUpPasswordSDiv);
            }
        }
        if(!birthday.classList.contains("is-invalid") && (birthday.value == "")){
            birthday.classList.add("is-invalid");
            birthdaySDiv = document.createElement("div");
            birthdaySDiv.className = 'invalid-feedback';
            birthdaySDiv.appendChild(document.createTextNode("Please enter your date of birth!"));
            birthdayDiv.appendChild(birthdaySDiv);
        }
        else{
            if(!birthday.value == "" && birthday.classList.contains("is-invalid")){
                birthday.classList.remove("is-invalid");
                birthday.classList.add("is-valid");
                birthdayDiv.removeChild(birthdaySDiv);
            }
        }
        if(!num.classList.contains("is-invalid") && (num.value == "")){
            num.classList.add("is-invalid");
            contactSDiv = document.createElement("div");
            contactSDiv.className = 'invalid-feedback';
            contactSDiv.appendChild(document.createTextNode("Please enter your contact number!"));
            contactDiv.appendChild(contactSDiv);
        }
        else{
            if(!num.value == "" && num.classList.contains("is-invalid")){
                num.classList.remove("is-invalid");
                num.classList.add("is-valid");
                contactDiv.removeChild(contactSDiv);
            }
        }
        if(!(genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid")) && (genderMale.checked == false && genderFemale.checked == false)){
            genderMale.classList.add("is-invalid");
            genderFemale.classList.add("is-invalid");
            genderSDiv = document.createElement("div");
            genderSDiv.className = 'invalid-feedback';
            genderSDiv.appendChild(document.createTextNode("Please select your gender!"));
            genderDiv.appendChild(genderSDiv);
        }
        else{
            if(!(genderMale.checked == false && genderFemale.checked == false) && (genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid"))){
                genderMale.classList.remove("is-invalid");
                genderFemale.classList.remove("is-invalid");
                genderMale.classList.add("is-valid");
                genderFemale.classList.add("is-valid");
                genderDiv.removeChild(genderSDiv);
            }
        }
        return;
    }

    if(signUpDiv.classList.contains("was-validated")){
        signUpDiv.classList.remove("was-validated");
    }

    if(!(String(num.value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && ! (String(num.value).match(/0{5,}/)))){
        num.classList.add("is-invalid");
        contactSDiv = document.createElement("div");
        contactSDiv.className = 'invalid-feedback';
        contactSDiv.appendChild(document.createTextNode("Please Enter Correct Format i.e. (+923121234567)"));
        contactDiv.appendChild(contactSDiv);
        return;
    }
    if(!(/^[A-Za-z\s]+$/.test(firstName.value))){
        firstName.classList.add("is-invalid");
        firstNameSDiv = document.createElement("div");
        firstNameSDiv.className = 'invalid-feedback';
        firstNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        firstNameDiv.appendChild(firstNameSDiv);
        return;
    }
    if(!(/^[A-Za-z\s]+$/.test(lastName.value))){
        lastName.classList.add("is-invalid");
        lastNameSDiv = document.createElement("div");
        lastNameSDiv.className = 'invalid-feedback';
        lastNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        lastNameDiv.appendChild(lastNameSDiv);
        return;
    }

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
                        window.location = "home/home.html";
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        password.classList.add("is-invalid");
                        signUpPasswordSDiv = document.createElement("div");
                        signUpPasswordSDiv.className = 'invalid-feedback';
                        signUpPasswordSDiv.appendChild(document.createTextNode("Please enter correct password!"));
                        passDiv.appendChild(signUpPasswordSDiv);
                    } else {
                        email.classList.add("is-invalid");
                        signUpEmailSDiv = document.createElement("div");
                        signUpEmailSDiv.className = 'invalid-feedback';
                        signUpEmailSDiv.appendChild(document.createTextNode("Please enter correct email address!"));
                        emailDiv.appendChild(signUpEmailSDiv);
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
                password.classList.add("is-invalid");
                signUpPasswordSDiv = document.createElement("div");
                signUpPasswordSDiv.className = 'invalid-feedback';
                signUpPasswordSDiv.appendChild(document.createTextNode("Password must be minimum of 6 characters long!"));
                passDiv.appendChild(signUpPasswordSDiv);
            } else {
                email.classList.add("is-invalid");
                signUpEmailSDiv = document.createElement("div");
                signUpEmailSDiv.className = 'invalid-feedback';
                signUpEmailSDiv.appendChild(document.createTextNode("Please enter correct email address!"));
                emailDiv.appendChild(signUpEmailSDiv);
            }
            console.log(error);
        });
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
