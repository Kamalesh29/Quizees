
// CALLING ALL REQUIRED ELEMENTES //
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
// VIEW HIGH SCORES IN LS //

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup",() => {
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

// SAVE HIGH SCORES TO LS //
saveHighScore = (e) => {
    console.log('click to save this');
    e.preventDefault();

    const score = {
    score: mostRecentScore,
    name: username.value
};
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5); // SPLICE OUT SCORES  SORT > TO < //

// HIGH SCORES LS TO HIGHSCORES PAGE //
    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign("index.html");
    //console.log(highScores);
};