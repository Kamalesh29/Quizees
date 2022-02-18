    // Getting All required elememts //
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progessBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const home = document.getElementById("home");

let score=0;
let currentQuestions={};
let acceptingAnswers=false;
let questionCounter=0;
let availableQuestions=[];

// Questions //
let questions = [];
let cat = document.getElementById('category').selectedOptions[0].value;
let mm = document.getElementById('difficulty').selectedOptions[0].value;
debugger;
// GETTING QUESTIONS FROM JSON API //
fetch("https://opentdb.com/api.php?amount=5&category="+cat+"&difficulty="+mm+"&type=multiple")
//fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
 .then(res =>{
   // console.log(res);
    return res.json();
})
 .then(loadedQuestions =>{
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 5) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
    });
    
    // home.classList.remove("hidden");
    // loader.classList.add("hidden");
  startGame();
})
.catch(err =>{
    console.error(err);
});

// Const for Start Game //
const CORRECT_ANSWER = 10;
const MAX_QUESTION = 5;

// Start Game //
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();

    // home.classList.remove("hidden");
    // loader.classList.add("hidden");
};
// Question and Choice Shown //
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTION){

        localStorage.setItem("mostRecentScore", score);

        // View end page //
        return window.location.assign("/last.html");
    }
    questionCounter ++;
    // ADD A QUESTIONS IN HUD //
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTION}`;

    // PROGRESS BAR // 
    progessBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex,1); // question index //
    // console.log(availableQuestions);
    acceptingAnswers=true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

   // Display Correct or Incorrect //
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    //  console.log(classToApply);
   
    // IF CORRECT ANSWER TO GET 10 SCORE //
    if(classToApply === "correct"){
        incrementScore(CORRECT_ANSWER);
    }

    // CLASS TO APPLY ADD OR REMOVE //
    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        getNewQuestion();
    },2000);
  });
});

// ADD A SCORE FOR A QUESTION //
incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
};


