var select_city = document.getElementById('select-city');
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

select_city.addEventListener('change', function () {
    if (select_city.value === 'karachi') {
        document.getElementById('select-town').innerHTML = `<option>North Karachi</option><option>New Karachi</option><option>North Nazimabad</option>`
    }
    else
        if (select_city.value === 'islamabad') {
            document.getElementById('select-town').innerHTML = `<option>Johar Road</option><option>Mangla Road</option><option>DHA</option>`
        }
        else {
            document.getElementById('select-town').innerHTML = `<option>Select Town</option>`
        }
    console.log(select_city.value);
})

function signUp() {
    if (!firstName.classList.contains("is-invalid") && (firstName.value == "")) {
        firstName.classList.add("is-invalid");
        firstNameSDiv = document.createElement("div");
        firstNameSDiv.className = 'invalid-feedback';
        firstNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
        firstNameDiv.appendChild(firstNameSDiv);
    }
    else {
        if (!firstName.value == "" && firstName.classList.contains("is-invalid")) {
            firstName.classList.remove("is-invalid");
            firstName.classList.add("is-valid");
            firstNameDiv.removeChild(firstNameSDiv);
        }
    }
    if (!lastName.classList.contains("is-invalid") && (lastName.value == "")) {
        lastName.classList.add("is-invalid");
        lastNameSDiv = document.createElement("div");
        lastNameSDiv.className = 'invalid-feedback';
        lastNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
        lastNameDiv.appendChild(lastNameSDiv);
    }
    else {
        if (!lastName.value == "" && lastName.classList.contains("is-invalid")) {
            lastName.classList.remove("is-invalid");
            lastName.classList.add("is-valid");
            lastNameDiv.removeChild(lastNameSDiv);
        }
    }
    if (!email.classList.contains("is-invalid") && (email.value == "")) {
        email.classList.add("is-invalid");
        signUpEmailSDiv = document.createElement("div");
        signUpEmailSDiv.className = 'invalid-feedback';
        signUpEmailSDiv.appendChild(document.createTextNode("Please enter an email address!"));
        emailDiv.appendChild(signUpEmailSDiv);
    }
    else {
        if (!email.value == "" && email.classList.contains("is-invalid")) {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            emailDiv.removeChild(signUpEmailSDiv);
        }
    }
    if (!password.classList.contains("is-invalid") && (password.value == "")) {
        password.classList.add("is-invalid");
        signUpPasswordSDiv = document.createElement("div");
        signUpPasswordSDiv.className = 'invalid-feedback';
        signUpPasswordSDiv.appendChild(document.createTextNode("Please enter your password!"));
        passDiv.appendChild(signUpPasswordSDiv);
    }
    else {
        if (!password.value == "" && password.classList.contains("is-invalid")) {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
            passDiv.removeChild(signUpPasswordSDiv);
        }
    }
    // if (!birthday.classList.contains("is-invalid") && (birthday.value == "")) {
    //     birthday.classList.add("is-invalid");
    //     birthdaySDiv = document.createElement("div");
    //     birthdaySDiv.className = 'invalid-feedback';
    //     birthdaySDiv.appendChild(document.createTextNode("Please enter your date of birth!"));
    //     birthdayDiv.appendChild(birthdaySDiv);
    // }
    // else {
    //     if (!birthday.value == "" && birthday.classList.contains("is-invalid")) {
    //         birthday.classList.remove("is-invalid");
    //         birthday.classList.add("is-valid");
    //         birthdayDiv.removeChild(birthdaySDiv);
    //     }
    // }
    if (!num.classList.contains("is-invalid") && (num.value == "")) {
        num.classList.add("is-invalid");
        contactSDiv = document.createElement("div");
        contactSDiv.className = 'invalid-feedback';
        contactSDiv.appendChild(document.createTextNode("Please enter your contact number!"));
        contactDiv.appendChild(contactSDiv);
    }
    else {
        if (!num.value == "" && num.classList.contains("is-invalid")) {
            num.classList.remove("is-invalid");
            num.classList.add("is-valid");
            contactDiv.removeChild(contactSDiv);
        }
    }
    // if (!(genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid")) && (genderMale.checked == false && genderFemale.checked == false)) {
    //     genderMale.classList.add("is-invalid");
    //     genderFemale.classList.add("is-invalid");
    //     genderSDiv = document.createElement("div");
    //     genderSDiv.className = 'invalid-feedback';
    //     genderSDiv.appendChild(document.createTextNode("Please select your gender!"));
    //     genderDiv.appendChild(genderSDiv);
    // }
    // else {
    //     if (!(genderMale.checked == false && genderFemale.checked == false) && (genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid"))) {
    //         genderMale.classList.remove("is-invalid");
    //         genderFemale.classList.remove("is-invalid");
    //         genderMale.classList.add("is-valid");
    //         genderFemale.classList.add("is-valid");
    //         genderDiv.removeChild(genderSDiv);
    //     }
    // }
    if (firstName.value == "" || lastName.value == "" || email.value == "" || password.value == "" || num.value == "" ) {
        signUpDiv.classList.add("was-validated");
        document.addEventListener('invalid', (function () {
            return function (e) {
                e.preventDefault();
            };
        })(), true);
        if (!firstName.classList.contains("is-invalid") && (firstName.value == "")) {
            firstName.classList.add("is-invalid");
            firstNameSDiv = document.createElement("div");
            firstNameSDiv.className = 'invalid-feedback';
            firstNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
            firstNameDiv.appendChild(firstNameSDiv);
        }
        else {
            if (!firstName.value == "" && firstName.classList.contains("is-invalid")) {
                firstName.classList.remove("is-invalid");
                firstName.classList.add("is-valid");
                firstNameDiv.removeChild(firstNameSDiv);
            }
        }
        if (!lastName.classList.contains("is-invalid") && (lastName.value == "")) {
            lastName.classList.add("is-invalid");
            lastNameSDiv = document.createElement("div");
            lastNameSDiv.className = 'invalid-feedback';
            lastNameSDiv.appendChild(document.createTextNode("Please enter your name!"));
            lastNameDiv.appendChild(lastNameSDiv);
        }
        else {
            if (!lastName.value == "" && lastName.classList.contains("is-invalid")) {
                lastName.classList.remove("is-invalid");
                lastName.classList.add("is-valid");
                lastNameDiv.removeChild(lastNameSDiv);
            }
        }
        if (!email.classList.contains("is-invalid") && (email.value == "")) {
            email.classList.add("is-invalid");
            signUpEmailSDiv = document.createElement("div");
            signUpEmailSDiv.className = 'invalid-feedback';
            signUpEmailSDiv.appendChild(document.createTextNode("Please enter an email address!"));
            emailDiv.appendChild(signUpEmailSDiv);
        }
        else {
            if (!email.value == "" && email.classList.contains("is-invalid")) {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
                emailDiv.removeChild(signUpEmailSDiv);
            }
        }
        if (!password.classList.contains("is-invalid") && (password.value == "")) {
            password.classList.add("is-invalid");
            signUpPasswordSDiv = document.createElement("div");
            signUpPasswordSDiv.className = 'invalid-feedback';
            signUpPasswordSDiv.appendChild(document.createTextNode("Please enter your password!"));
            passDiv.appendChild(signUpPasswordSDiv);
        }
        else {
            if (!password.value == "" && password.classList.contains("is-invalid")) {
                password.classList.remove("is-invalid");
                password.classList.add("is-valid");
                passDiv.removeChild(signUpPasswordSDiv);
            }
        }
        // if (!birthday.classList.contains("is-invalid") && (birthday.value == "")) {
        //     birthday.classList.add("is-invalid");
        //     birthdaySDiv = document.createElement("div");
        //     birthdaySDiv.className = 'invalid-feedback';
        //     birthdaySDiv.appendChild(document.createTextNode("Please enter your date of birth!"));
        //     birthdayDiv.appendChild(birthdaySDiv);
        // }
        // else {
        //     if (!birthday.value == "" && birthday.classList.contains("is-invalid")) {
        //         birthday.classList.remove("is-invalid");
        //         birthday.classList.add("is-valid");
        //         birthdayDiv.removeChild(birthdaySDiv);
        //     }
        // }
        if (!num.classList.contains("is-invalid") && (num.value == "")) {
            num.classList.add("is-invalid");
            contactSDiv = document.createElement("div");
            contactSDiv.className = 'invalid-feedback';
            contactSDiv.appendChild(document.createTextNode("Please enter your contact number!"));
            contactDiv.appendChild(contactSDiv);
        }
        else {
            if (!num.value == "" && num.classList.contains("is-invalid")) {
                num.classList.remove("is-invalid");
                num.classList.add("is-valid");
                contactDiv.removeChild(contactSDiv);
            }
        }
        // if (!(genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid")) && (genderMale.checked == false && genderFemale.checked == false)) {
        //     genderMale.classList.add("is-invalid");
        //     genderFemale.classList.add("is-invalid");
        //     genderSDiv = document.createElement("div");
        //     genderSDiv.className = 'invalid-feedback';
        //     genderSDiv.appendChild(document.createTextNode("Please select your gender!"));
        //     genderDiv.appendChild(genderSDiv);
        // }
        // else {
        //     if (!(genderMale.checked == false && genderFemale.checked == false) && (genderMale.classList.contains("is-invalid") && genderFemale.classList.contains("is-invalid"))) {
        //         genderMale.classList.remove("is-invalid");
        //         genderFemale.classList.remove("is-invalid");
        //         genderMale.classList.add("is-valid");
        //         genderFemale.classList.add("is-valid");
        //         genderDiv.removeChild(genderSDiv);
        //     }
        // }
        return;
    }

    if (signUpDiv.classList.contains("was-validated")) {
        signUpDiv.classList.remove("was-validated");
    }

    if (!(String(num.value).match(/^([9][2]\d{10}$)/) && !(String(num.value).match(/0{5,}/)))) {
        num.classList.add("is-invalid");
        contactSDiv = document.createElement("div");
        contactSDiv.className = 'invalid-feedback';
        contactSDiv.appendChild(document.createTextNode("Please Enter Correct Format i.e. (+923121234567)"));
        contactDiv.appendChild(contactSDiv);
        return;
    }
    if (!(/^[A-Za-z\s]+$/.test(firstName.value))) {
        firstName.classList.add("is-invalid");
        firstNameSDiv = document.createElement("div");
        firstNameSDiv.className = 'invalid-feedback';
        firstNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        firstNameDiv.appendChild(firstNameSDiv);
        return;
    }
    if (!(/^[A-Za-z\s]+$/.test(lastName.value))) {
        lastName.classList.add("is-invalid");
        lastNameSDiv = document.createElement("div");
        lastNameSDiv.className = 'invalid-feedback';
        lastNameSDiv.appendChild(document.createTextNode("Please Enter Only Letters!"));
        lastNameDiv.appendChild(lastNameSDiv);
        return;
    }

    // if (genderMale.checked == true) {
    //     genderVal = genderMale.value;
    // }
    // else {
    //     genderVal = genderFemale.value;
    // }

    // var user = {
    //     firstName: toTitleCase(firstName.value),
    //     lastName: toTitleCase(lastName.value),
    //     email: email.value,
    //     password: password.value,
    //     // birthday: birthday.value,
    //     // gender: genderVal,
    //     num: num.value,
    //     // country: country.value
    // }

    console.log(user);
}