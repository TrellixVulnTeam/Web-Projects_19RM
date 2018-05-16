if(localStorage.getItem("userData") == null){
    alertBox("alert alert-danger","LogIn First!")
    window.location = "../login/login.html";
}
var mainDiv = document.getElementById("body");
var database = firebase.database().ref("/");
var duaArray = [];
var prayers = document.getElementById("prayers");
var user = JSON.parse(localStorage.getItem("userData"));    

            database.child('post').on("child_added", function (snapshot) {
                var obj = snapshot.val();
                obj.key = snapshot.key
            
                
                var div1 = document.createElement("DIV")
                div1.setAttribute("class", "card");
                div1.setAttribute("id", obj.key);
                var div2 = document.createElement("DIV")
                div2.setAttribute("class", "card-body")
                var h4 = document.createElement("H4")
                h4.setAttribute("class", "card-title")
                h4.setAttribute("style","color: #000000")
                var h6 = document.createElement("h6");
                h6.className = "card-subtitle mb-2 text-muted";
                var p = document.createElement("P")
                p.setAttribute("class", "card-text")
                p.setAttribute("style","color: #000000")
                
                // comment code
                var commentDiv = document.createElement("DIV");
                commentDiv.setAttribute("class", "form-group");
                
                var input = document.createElement("INPUT");
                input.className = "form-control";
                input.required = true;
                
                var span = document.createElement("span");
                span.className = "input-group-btn float-right";
                
                var button = document.createElement("input");
                button.type = "button"
                button.className = "btn btn-outline-success"
                button.value = "Comment"
                
                
                button.addEventListener("click", function () {
                    if(mainDiv.classList.contains("was-validated")){
                        mainDiv.classList.remove("was-validated");
                    }
                    if(input.classList.contains("is-invalid")){
                        input.classList.remove("is-invalid");
                        commentDiv.removeChild(cmtSDiv);
                    }
                    if(input.value==""){
                        alertBox("alert alert-danger","Enter comment first!");
                        input.classList.add("is-invalid");
                        mainDiv.classList.add("was-validated");
                                    document.addEventListener('invalid', (function(){
                                        return function(e){
                                            e.preventDefault();
                                        };
                                    })(), true);
                        cmtSDiv = document.createElement("div");
                        cmtSDiv.className = 'invalid-feedback';
                        cmtSDiv.appendChild(document.createTextNode("Please enter your comment here!"));
                        commentDiv.appendChild(cmtSDiv);
                        return;
                    }
                    var commentOBJ = {
                        sender: user.firstName +" "+ user.lastName,
                        comment: input.value,
                        postUID: obj.key
                    }
                    database.child('comment').push(commentOBJ);
                    input.value = "";
                })
            
                span.appendChild(button)
                commentDiv.appendChild(input)
                commentDiv.appendChild(span)
            
                // comments render
                var commentList = document.createElement("DIV");
            
                var textH4 = document.createTextNode(obj.name);
                var textP = document.createTextNode(obj.dua);
                var textH6 = document.createTextNode("Dua Is For: "+obj.duaFor);
                h4.appendChild(textH4);
                h6.appendChild(textH6);
                p.appendChild(textP);
                div2.appendChild(h4);
                div2.appendChild(h6);
                div2.appendChild(p);
                div2.appendChild(commentDiv);
                div1.appendChild(div2);
                div1.appendChild(commentList);
                body.appendChild(div1);
            
            })
            
            database.child("comment").on('child_added', function (data) {
                var comment = data.val();
                renderComment(comment);
            })
            
            function renderComment(comment) {
                var mainDiv = document.createElement("DIV");
                var bodyDiv = document.createElement("DIV");
                mainDiv.setAttribute("class", "card");
                bodyDiv.setAttribute("class", "card-body");
                bodyDiv.setAttribute("style","color: #222233; font-style: italic")
                mainDiv.appendChild(bodyDiv);
            
                var commentText = document.createTextNode(comment.sender + " : " + comment.comment);
                bodyDiv.appendChild(commentText);
                var postDiv = document.getElementById(comment.postUID);
            
                var commentDiv = postDiv.lastElementChild;
                commentDiv.appendChild(mainDiv);
            }

            function goBack(){
                window.location = "../home/home.html";
            }

            function logout(){
                localStorage.removeItem("userData");
                window.location = "../login/login.html";
            }


// interval = null;
// function alertBox(classValue,textValue){
//     var chk = document.getElementById("alertDiv");
//     if(document.body.contains(chk)){
//         document.body.removeChild(chk);
//         clearTimeout(interval);
//     }
//     var alertDiv = document.createElement("div");
//     alertDiv.className = "container " + classValue;
//     alertDiv.setAttribute("role","alert");
//     alertDiv.setAttribute("id","alertDiv")
//     alertDiv.appendChild(document.createTextNode(textValue));    
//     var startTime = new Date().getTime();
//     interval = setInterval(function(){
//         if(new Date().getTime() - startTime > 4000){
//             document.body.removeChild(alertDiv);
//             clearTimeout(interval);
//             return;
//         }
//            document.body.insertBefore(alertDiv,mainDiv);
           
//     }, 20);  
//     return;
// }