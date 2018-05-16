var quizData = localStorage.getItem("quizes");

if(quizData === null){
    document.write("No Quiz Available!");
}
else
{
   quizData = (JSON.parse(quizData));
for(var i = 0; i < quizData.length; i++){
    console.log(quizData[i].quizName);
}
var list = document.createElement("ul");
for(var i = 0; i < quizData.length; i++){
    var anchor = document.createElement("a");
    anchor.setAttribute("onclick","displayQuestion(this)")
    var li = document.createElement("li");
    var ancValue = document.createTextNode(quizData[i].quizName);
    li.appendChild(anchor).appendChild(ancValue);
    document.body.appendChild(list).appendChild(li);
}
}
function displayQuestion(param){
    localStorage.setItem("quizType",param.innerHTML);
    window.location = "takequiz.html";
}