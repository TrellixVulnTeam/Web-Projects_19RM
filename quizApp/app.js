var quizname = document.getElementById('quizname');
var marks = document.getElementById('marks');
var time = document.getElementById('time');
var instructions = document.getElementById('instructions');
var syllabus = document.getElementById('syllabus');

function quizDataSubmit() {
    var quiz = {
        quizName: quizname.value,
        marks: marks.value,
        time: time.value,
        syllabus: syllabus.value,

    }

    localStorage.setItem('quiztempdata', JSON.stringify(quiz));
    location = 'addquestions.html';
    
}

