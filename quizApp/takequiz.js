var quizData = localStorage.getItem("quizes");
var correctAns;
quizData = JSON.parse(quizData);
var param = localStorage.getItem("quizType");
var queNum = 0;
var booleanButton = false;
var marks = [];
var opts,opt1 = false,opt2 = false;
var marksBackup;
for(var i = 0; i < quizData.length; i++)
    {
    if(quizData[i].quizName === param)
        {
            localStorage.setItem('temptakequiz', JSON.stringify(quizData[i]));
            localStorage.setItem("marks",JSON.stringify(marks));
        }    
    }
var temptakequiz = localStorage.getItem("temptakequiz");
temptakequiz = JSON.parse(temptakequiz);
var numOfQue = temptakequiz.questions.length;
document.getElementById("quizName").innerHTML = "Quiz Name: " + param;
getQuestion();
function enableButton(booleanButton){
    if(booleanButton)
    {
        document.getElementById("nextButton").disabled = false;
        booleanButton = false;
        
        
    }
}
function checkAns(){
    var options = document.getElementsByName("option");
    opts = temptakequiz.questions[queNum-1].options;
    if(opts[0].option1corr === 'true'){
        opt1 = true;
    }
    if(opts[1].option2corr === 'true'){
        opt2 = true;
    }
    // for(var i = 0 ; i < options.length ; i++){
        if(opt1 === options[0].checked){
            marks = localStorage.getItem("marks");
            if(marks === null){
                marks = [];    
            }else {
                   marks = JSON.parse(marks);
                }
            console.log("if condition 1 runs!" + opts[0].option1);
            console.log(options[0].checked);
            console.log(opt1);
            // for(var j = 0  ; j < options.length ; j++){
                if(options[0].checked === opt1){
                marksBackup = temptakequiz.questions[queNum].marks;
                marks.push(marksBackup);
            // }
            }
        }
        else if(opt1 === options[1].checked){
            marks = localStorage.getItem("marks");
            marks = JSON.parse(marks);
            marks.push(0);
        }
        else if(opt2 === options[1].checked){
            marks = localStorage.getItem("marks");
            if(marks === null){
                marks = [];    
            }else {
                   marks =  JSON.parse(marks);
                }
            console.log("if condition 2 runs! " + opts[1].option2);
            console.log(options[1].checked);
            console.log(opt2);
            // for(var j = 0  ; j < options.length ; j++){
                if(options[1].checked === opt2){
                marksBackup = temptakequiz.questions[queNum].marks;
                marks.push(marksBackup);
            }
            // }
        }
        else if(opt2 === options[0].checked){
            marks = localStorage.getItem("marks");
            marks = JSON.parse(marks);
            marks.push(0);
        }
        
    // }
    localStorage.setItem("marks",JSON.stringify(marks));
    opt1 = false;
    opt2 = false;
    getQuestion();
}
function getQuestion(){
    document.getElementById("question").innerHTML = temptakequiz.questions[queNum].question;
    document.getElementById("option1").checked = false;
    document.getElementById("option2").checked = false;
    document.getElementById("label1").innerHTML = temptakequiz.questions[queNum].options[0].option1;
    document.getElementById("label2").innerHTML = temptakequiz.questions[queNum].options[1].option2;
    if(booleanButton){
        booleanButton = false;
    }
    document.getElementById("nextButton").disabled = true;
    queNum++;
    if(queNum === numOfQue){
        document.getElementById("nextButton").innerHTML = "Generate Result";
    }
}
