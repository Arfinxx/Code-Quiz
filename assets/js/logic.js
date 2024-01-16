// Variables
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionEl = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var timerEl = document.querySelector("#time");


// When the start button is pressed a timer starts
var timeLeft = 30;
var questionNumber = 0;
var answerArr = questions[questionNumber].answers;
function countdownTimer () {
    

    var timeInterval = setInterval(function () {
        
        if (timeLeft >= 0){

            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl = ``;
            clearInterval(timeInterval);
        }
    }, 1000);
};


startButton.addEventListener("click", function() {

    countdownTimer();
// Then a question appears with 4 answer options
if(questionEl.getAttribute("class") === "hide"){ 
    startScreen.textContent = ``;

    questionTitle.textContent = questions[questionNumber].title
   for(i = 0; i < answerArr.length; i++) { 
    var node = document.createElement("li");
    var textnode = document.createTextNode(answerArr[i]);
    node.appendChild(textnode);
    questionChoices.appendChild(node);
    console.log(questionChoices);
   }



    questionEl.setAttribute("class", "show");
} else {
    questionTitle.textContent = ``;
    questionEl.setAttribute("class", "hide");
}
});



// When an answer is clicked it tells the user if it is correct or incorrect
// When an right answer is clicked the score changes
// When an incorrect answer is clicked the time is reduced
// The next question appears.
// repeats until all questions have been answered, or time runs out
// Gives the user the option of entering their intials


// Saves their score locally and lists it on the "highscores" page.
// There is a button with the option of resetting the leaderboard. 