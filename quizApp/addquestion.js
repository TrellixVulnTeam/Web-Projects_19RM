var questionInput = document.getElementById('question');
var option1 = document.getElementById('option1');
var option1corr = document.getElementById('option1corr');
var option2 = document.getElementById('option2');
var option2corr = document.getElementById('option2corr');
var marks = document.getElementById('marks');

function questionData(param) {
    var questions = {
        question: questionInput.value,
        options: [
            {
                option1: option1.value,
                option1corr: option1corr.value
            },
            {
                option2: option2.value,
                option2corr: option2corr.value
            }
        ],
        marks: marks.value
    }


    var quizesData = localStorage.getItem('quiztempdata');

    if (quizesData === null) {
        location = 'quizcreate.html';
    }
    else {
        quizesData = JSON.parse(quizesData);
    }

    if (!quizesData.questions) {
        quizesData.questions = [];
    }

    if (param === 'add') {
    quizesData.questions.push(questions);
    questionInput.value = '';
    option1.value = '';
    option1corr.value = '';
    option2.value = '';
    option2corr.value = '';
    marks.value = '';
    }
    localStorage.setItem('quiztempdata', JSON.stringify(quizesData));

    if(param === 'save'){
        
        var quizes = localStorage.getItem('quizes');
        if (quizes === null) {
            quizes = [];
        }
        else {
            quizes = JSON.parse(quizes);
        }

        quizes.push(quizesData);

        localStorage.setItem('quizes', JSON.stringify(quizes));
        localStorage.removeItem('quiztempdata');
        location = 'index.html';

    }
}   