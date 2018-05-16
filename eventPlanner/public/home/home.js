if(localStorage.getItem("userData") == null){
    window.location = "../index.html";
}
// const functions = require("firebase-functions");
var database = firebase.database().ref("/");
var storageRef = firebase.storage().ref("/");
var user = JSON.parse(localStorage.getItem("userData"));
var userName = document.getElementById("userName");
var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var birthday = document.getElementById("birthday");
var gender = document.getElementById("gender");
var num = document.getElementById("num");
var country = document.getElementById("country");
var eventName = document.getElementById("eventName");
var eventNameDiv = document.getElementById("eventNameDiv");
var eventDate = document.getElementById("eventDate");
var eventDateDiv = document.getElementById("eventDateDiv");
var contact = document.getElementById("contact");
var eventContactDiv = document.getElementById("eventContactDiv");
var venue = document.getElementById("venue");
var eventVenueDiv = document.getElementById("venueDiv");
var eventDesc = document.getElementById("eventDesc");
var eventDescDiv = document.getElementById("eventDescDiv");
var createEventDiv = document.getElementById("createEventBody");
var imgDiv = document.getElementById("imgDiv");
var showEventsDiv = document.getElementById("showEventsDiv");
var eventBtn = document.getElementById("eventBtn");
var eventCloseBtn = document.getElementById("eventCloseBtn");
var breakLine = document.getElementById("breakLine");
var img;
var imgInp = document.getElementById("imgInp");
var img_upload = document.getElementById("img-upload");
var imgSrc = document.getElementById("imgSrc");
var eventsArray = [];
console.log(user);
fullname.innerHTML = "Name : " + user.firstName + " " + user.lastName;
num.innerHTML = "Contact : " + user.num;
userName.innerHTML = user.firstName + " " + user.lastName;
email.innerHTML ="Email Address : " + user.email;
birthday.innerHTML ="Age : " + calculateAge(user.birthday) + ' years';
gender.innerHTML ="Gender : " + user.gender;
country.innerHTML ="Lives in : " + user.country;

imgInp.addEventListener("change", function(e){
    eventBtn.disabled = true;
    var file = e.target.files[0];
    storageRef.child("event_images/" + file.name).put(file)
    .then(function (snap){
        img = snap.downloadURL;
        console.log(img);
        eventBtn.disabled = false;
    })
    .catch(function (err){
        console.log(err);
        eventBtn.disabled = false;
    })
});

function createEventFunc(){
    if(eventBtn.hasAttribute("data-toggle") && eventBtn.hasAttribute("data-dismiss")){
        eventBtn.removeAttribute("data-toggle");
        eventBtn.removeAttribute("data-dismiss");
    }
    if(!eventName.classList.contains("is-invalid") && (eventName.value == "")){
        eventName.classList.add("is-invalid");
        eventNameSDiv = document.createElement("div");
        eventNameSDiv.className = 'invalid-feedback';
        eventNameSDiv.appendChild(document.createTextNode("Please enter your event name!"));
        eventNameDiv.appendChild(eventNameSDiv);
    }
    else{
        if(!eventName.value == "" && eventName.classList.contains("is-invalid")){
            eventName.classList.remove("is-invalid");
            eventName.classList.add("is-valid");
            eventNameDiv.removeChild(eventNameSDiv);
        }
    }
    if(!eventDate.classList.contains("is-invalid") && (eventDate.value == "")){
        eventDate.classList.add("is-invalid");
        eventDateSDiv = document.createElement("div");
        eventDateSDiv.className = 'invalid-feedback';
        eventDateSDiv.appendChild(document.createTextNode("Please enter your event date and time!"));
        eventDateDiv.appendChild(eventDateSDiv);
    }
    else{
        if(!eventDate.value == "" && eventDate.classList.contains("is-invalid")){
            eventDate.classList.remove("is-invalid");
            eventDate.classList.add("is-valid");
            eventDateDiv.removeChild(eventDateSDiv);
        }
    }
    if(!contact.classList.contains("is-invalid") && (contact.value == "")){
        contact.classList.add("is-invalid");
        eventContactSDiv = document.createElement("div");
        eventContactSDiv.className = 'invalid-feedback';
        eventContactSDiv.appendChild(document.createTextNode("Please enter organizer's contact number!"));
        eventContactDiv.appendChild(eventContactSDiv);
    }
    else{
        if(!contact.value == "" && contact.classList.contains("is-invalid")){
            contact.classList.remove("is-invalid");
            contact.classList.add("is-valid");
            eventContactDiv.removeChild(eventContactSDiv);
        }
    }
    if(!venue.classList.contains("is-invalid") && (venue.value == "")){
        venue.classList.add("is-invalid");
        eventVenueSDiv = document.createElement("div");
        eventVenueSDiv.className = 'invalid-feedback';
        eventVenueSDiv.appendChild(document.createTextNode("Please enter venue of the event!"));
        eventVenueDiv.appendChild(eventVenueSDiv);
    }
    else{
        if(!venue.value == "" && venue.classList.contains("is-invalid")){
            venue.classList.remove("is-invalid");
            venue.classList.add("is-valid");
            eventVenueDiv.removeChild(eventVenueSDiv);
        }
    }
    if(!eventDesc.classList.contains("is-invalid") && (eventDesc.value == "")){
        eventDesc.classList.add("is-invalid");
        eventDescSDiv = document.createElement("div");
        eventDescSDiv.className = 'invalid-feedback';
        eventDescSDiv.appendChild(document.createTextNode("Write something about this event!"));
        eventDescDiv.appendChild(eventDescSDiv);
    }
    else{
        if(!eventDesc.value == "" && eventDesc.classList.contains("is-invalid")){
            eventDesc.classList.remove("is-invalid");
            eventDesc.classList.add("is-valid");
            eventDescDiv.removeChild(eventDescSDiv);
        }
    }
    if(!imgSrc.classList.contains("is-invalid") && (imgSrc.value == "")){
        imgSrc.classList.add("is-invalid");
        imgSDiv = document.createElement("div");
        imgSDiv.className = 'invalid-feedback';
        imgSDiv.appendChild(document.createTextNode("Please upload an appropriate image for your event!"));
        imgDiv.appendChild(imgSDiv);
    }
    else{
        if(!imgSrc.value == "" && imgSrc.classList.contains("is-invalid")){
            imgSrc.classList.remove("is-invalid");
            imgSrc.classList.add("is-valid");
            imgDiv.removeChild(imgSDiv);
        }
    }
    if(eventName.value == "" || eventDate.value == "" || contact.value == "" || venue.value == "" || eventDesc.value == "" || imgSrc.value == ""){
        createEventDiv.classList.add("was-validated");
        document.addEventListener('invalid', (function(){
            return function(e){
                e.preventDefault();
            };
        })(), true);
        if(!eventName.classList.contains("is-invalid") && (eventName.value == "")){
            eventName.classList.add("is-invalid");
            eventNameSDiv = document.createElement("div");
            eventNameSDiv.className = 'invalid-feedback';
            eventNameSDiv.appendChild(document.createTextNode("Please enter your event name!"));
            eventNameDiv.appendChild(eventNameSDiv);
        }
        else{
            if(!eventName.value == "" && eventName.classList.contains("is-invalid")){
                eventName.classList.remove("is-invalid");
                eventName.classList.add("is-valid");
                eventNameDiv.removeChild(eventNameSDiv);
            }
        }
        if(!eventDate.classList.contains("is-invalid") && (eventDate.value == "")){
            eventDate.classList.add("is-invalid");
            eventDateSDiv = document.createElement("div");
            eventDateSDiv.className = 'invalid-feedback';
            eventDateSDiv.appendChild(document.createTextNode("Please enter your event date and time!"));
            eventDateDiv.appendChild(eventDateSDiv);
        }
        else{
            if(!eventDate.value == "" && eventDate.classList.contains("is-invalid")){
                eventDate.classList.remove("is-invalid");
                eventDate.classList.add("is-valid");
                eventDateDiv.removeChild(eventDateSDiv);
            }
        }
        if(!contact.classList.contains("is-invalid") && (contact.value == "")){
            contact.classList.add("is-invalid");
            eventContactSDiv = document.createElement("div");
            eventContactSDiv.className = 'invalid-feedback';
            eventContactSDiv.appendChild(document.createTextNode("Please enter organizer's contact number!"));
            eventContactDiv.appendChild(eventContactSDiv);
        }
        else{
            if(!contact.value == "" && contact.classList.contains("is-invalid")){
                contact.classList.remove("is-invalid");
                contact.classList.add("is-valid");
                eventContactDiv.removeChild(eventContactSDiv);
            }
        }
        if(!venue.classList.contains("is-invalid") && (venue.value == "")){
            venue.classList.add("is-invalid");
            eventVenueSDiv = document.createElement("div");
            eventVenueSDiv.className = 'invalid-feedback';
            eventVenueSDiv.appendChild(document.createTextNode("Please enter venue of the event!"));
            eventVenueDiv.appendChild(eventVenueSDiv);
        }
        else{
            if(!venue.value == "" && venue.classList.contains("is-invalid")){
                venue.classList.remove("is-invalid");
                venue.classList.add("is-valid");
                eventVenueDiv.removeChild(eventVenueSDiv);
            }
        }
        if(!eventDesc.classList.contains("is-invalid") && (eventDesc.value == "")){
            eventDesc.classList.add("is-invalid");
            eventDescSDiv = document.createElement("div");
            eventDescSDiv.className = 'invalid-feedback';
            eventDescSDiv.appendChild(document.createTextNode("Write something about this event!"));
            eventDescDiv.appendChild(eventDescSDiv);
        }
        else{
            if(!eventDesc.value == "" && eventDesc.classList.contains("is-invalid")){
                eventDesc.classList.remove("is-invalid");
                eventDesc.classList.add("is-valid");
                eventDescDiv.removeChild(eventDescSDiv);
            }
        }
        if(!imgSrc.classList.contains("is-invalid") && (imgSrc.value == "")){
            imgSrc.classList.add("is-invalid");
            imgSDiv = document.createElement("div");
            imgSDiv.className = 'invalid-feedback';
            imgSDiv.appendChild(document.createTextNode("Please upload an appropriate image for your event!"));
            imgDiv.appendChild(imgSDiv);
        }
        else{
            if(!imgSrc.value == "" && imgSrc.classList.contains("is-invalid")){
                imgSrc.classList.remove("is-invalid");
                imgSrc.classList.add("is-valid");
                imgDiv.removeChild(imgSDiv);
            }
        }
        return;
    }
    if(createEventDiv.classList.contains("was-validated")){
        createEventDiv.classList.remove("was-validated");
    }

    if(!(String(contact.value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && ! (String(contact.value).match(/0{5,}/)))){
        contact.classList.add("is-invalid");
        eventContactSDiv = document.createElement("div");
        eventContactSDiv.className = 'invalid-feedback';
        eventContactSDiv.appendChild(document.createTextNode("Please Enter Correct Format i.e. (+923121234567)"));
        eventContactDiv.appendChild(eventContactSDiv);
        return;
    }

    
      
        

    var event ={
        eventname : toTitleCase(eventName.value),
        eventdate : eventDate.value,
        eventcontact : contact.value,
        eventvenue : venue.value,
        eventdesc :eventDesc.value,
        eventBy : user.firstName + " " + user.lastName,
        eventImg : String(img)
    }
    
    database.child("events").push(event);
    database.child("events").on("child_added",function(snap){
        var obj = snap.val();
        obj.id = snap.key;
        localStorage.setItem("events",JSON.stringify(obj));
    })
    eventName.value = "";
    eventDate.value = "";
    contact.value = "";
    venue.value = "";
    eventDesc.value = "";
    img = "";
    imgSrc.value = "";
    img_upload.src = "";
    
    console.log("Success!");
    eventBtn.setAttribute("data-toggle","modal");
    eventBtn.setAttribute("data-dismiss","modal");
}

function showEvents(){
    database.child("myevents/").once('value', function(snapEvent){
        snapEvent.forEach(function(element) {
            var eventVal = element.val()
            eventsArray.push(eventVal);
        });
    });
    console.log(eventsArray.length);
    console.log(eventsArray);
    
    database.child('events').on("child_added", function (snapshot) {
        var obj = snapshot.val();
        obj.key = snapshot.key;
        btn = document.createElement("a");
        btn.setAttribute("href","#");
        database.child("users/" + user.id + "/myevents/" + obj.key).on('value',function(snap){
            if(snap.exists()){
                // btn = document.createElement("a");
                // btn.setAttribute("href","#");
                btn.className = "btn btn-outline-danger eventItems";
                btn.setAttribute("id",obj.key);
                btnText = document.createTextNode("Not Going");
                btn.appendChild(btnText);
                console.log("success");
                database.child("users/" + user.id + "/myevents/" + obj.key).off();
            }
            else{
                // btn = document.createElement("a");
                // btn.setAttribute("href","#");
                btn.className = "btn btn-outline-success eventItems";
                btn.setAttribute("id",obj.key);
                btnText = document.createTextNode("Going");
                btn.appendChild(btnText);
                console.log("failure!")
                database.child("users/" + user.id + "/myevents/" + obj.key).off();
            }
        })
        console.log(obj.key);
        venueIcon = document.createElement("i");
        venueIcon.className = "fa fa-map-marker";
        dateIcon = document.createElement("i");
        dateIcon.className = "fa fa-clock-o";
        contactIcon = document.createElement("i");
        contactIcon.className = "fa fa-phone";
        div1 = document.createElement("DIV");
        div1.setAttribute("class", "card bd-dark text-center eventItems");
        div1.setAttribute("id", obj.key);
        div1.setAttribute("style","color: black");
        cardHeader = document.createElement("div");
        cardHeader.className = "card-header h4 eventItems";
        cardImg = document.createElement("img");
        cardImg.className = "card-img eventItems";
        cardImg.setAttribute("alt","Card image");
        div2 = document.createElement("DIV");
        div2.setAttribute("class", "card-img-top eventItems");
        cardDate = document.createElement("h6");
        cardDate.className = "card-subtitle mb-2 text-muted eventItems";
        cardDesc = document.createElement("P");
        cardDesc.setAttribute("class", "card-text eventItems");
        cardVenue = document.createElement("p");
        cardVenue.setAttribute("class","card-text eventItems");
        cardContact = document.createElement("p");
        cardContact.setAttribute("class","card-text eventItems");
        textCardTitle = document.createTextNode(obj.eventname);
        textCardDesc = document.createTextNode(obj.eventdesc);
        textCardDate = document.createTextNode(" " + obj.eventdate);
        textCardVenue = document.createTextNode(" " + obj.eventvenue);
        textCardContact = document.createTextNode(" " + obj.eventcontact);
        // if(database.child("users/" + user.id + "/myevents/" + obj.key) == null){
            //     btn = document.createElement("a");
            //     btn.className = "btn btn-outline-success eventItems";
            //     btn.setAttribute("href","#");
            //     btn.setAttribute("id",obj.key);
            //     btnText = document.createTextNode("Going");
            //     btn.appendChild(btnText);
            // }
            // else{
                //     btn = document.createElement("a");
                //     btn.className = "btn btn-outline-danger eventItems";
                //     btn.setAttribute("href","#");
                //     btn.setAttribute("id",obj.key);
                //     btnText = document.createTextNode("Not Going");
                //     btn.appendChild(btnText);
                // }
                cardImg.src = obj.eventImg;
                cardHeader.appendChild(textCardTitle);
                cardDate.appendChild(dateIcon);
                cardDate.appendChild(textCardDate);
                cardDesc.appendChild(textCardDesc);
                cardVenue.appendChild(venueIcon);
                cardVenue.appendChild(textCardVenue);
                cardContact.appendChild(contactIcon);
                cardContact.appendChild(textCardContact);
                div2.appendChild(cardHeader);
                div2.appendChild(cardVenue);
                div2.appendChild(cardDate);
                div2.appendChild(cardDesc);
                div2.appendChild(cardContact);
                if(true){
                        
                }
                div2.appendChild(btn);
        div1.appendChild(cardImg);
        div1.appendChild(div2);
        showEventsDiv.insertBefore(div1,breakLine);
        btn.addEventListener("click",function(para){
            if(btn.classList.contains("btn-outline-success")){
                btn.classList.remove("btn-outline-success");
                btn.removeChild(btnText);
                btnText = document.createTextNode("Not Going");
                btn.appendChild(btnText);
                btn.classList.add("btn-outline-danger");
                database.child("myevents/" + user.id + obj.key ).push(obj);
            }
            else if(btn.classList.contains("btn-outline-danger")){
                btn.classList.remove("btn-outline-danger");
                btn.removeChild(btnText);
                btnText = document.createTextNode("Going");
                btn.appendChild(btnText);
                btn.classList.add("btn-outline-success");
                database.child("myevents/" + user.id + obj.key  ).remove();
            }
        })
    });
}
        
function closeEvents(){
        var nodesToDelete = document.getElementsByClassName("eventItems") ;
        while(nodesToDelete[0]){
            showEventsDiv.removeChild(nodesToDelete[0]);
        }
}

function calculateAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}