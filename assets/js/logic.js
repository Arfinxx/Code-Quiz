// Variables
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionEl = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var timerEl = document.querySelector("#time");
var answerFeedback = document.createElement("h2");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var initialBox = document.querySelector("#initials");
var clearBtn = document.querySelector("#clear");

var timeLeft = 30;
var questionNumber = 0;
var score = 0;
var scoreboard = [];

function showEndScreen(){
    questionEl.setAttribute("class", "hide");
    endScreen.setAttribute("class", "");
    timerEl.textContent = ``;
    finalScore.textContent = score;
};
// When the start button is pressed a timer starts

timerEl.textContent = timeLeft;
function countdownTimer () {
    
    
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        // repeats until all questions have been answered, or time runs out
        if (timeLeft <= 0){
            showEndScreen();    
            clearInterval(timeInterval);
        }
    }, 1000);
};

function nextQuestion (){
    
    if(questionEl.getAttribute("class") === "hide"){ 
        startScreen.textContent = ``;
        questionTitle.textContent = questions[questionNumber].title;
        questionChoices.textContent = `` ;
        var answerArr = questions[questionNumber].answers;
        
        for(i = 0; i < answerArr.length; i++) { 
            
            var node = document.createElement("li");
            var textnode = document.createTextNode(answerArr[i]);
            node.appendChild(textnode);
            
            // assigns a custom number attribute so that individual list items can be selected
            node.setAttribute("data-answerIndex", i)
            questionChoices.appendChild(node);
        }
        questionEl.setAttribute("class", "show");
    } else {
        questionTitle.textContent = ``;
        questionEl.setAttribute("class", "hide");
    }
};

startButton.addEventListener("click", function() {
    
    countdownTimer();
    // Then a question appears with 4 answer options
    nextQuestion();
});

function delayedFunc (){
    if (questionNumber >= questions.length){
        return;
    } else{
        questionEl.setAttribute("class", "hide");
        nextQuestion ();
        answerFeedback.textContent ="";
    }};
    
    // When an answer is clicked it tells the user if it is correct or incorrect
    questionChoices.addEventListener("click", function(e){
        e.preventDefault();
        
        var selectedAnswer = e.target;
        var selectedAnswerIndex = selectedAnswer.getAttribute("data-answerIndex");
        questionEl.appendChild(answerFeedback);
        
        // When an right answer is clicked the score changes
        if(selectedAnswerIndex == correctArr[questionNumber]){
            answerFeedback.textContent = "Correct!";
            score += 10;
            questionNumber++;
            
            // When an incorrect answer is clicked the time is reduced
        } else{
            answerFeedback.textContent = "Wrong!";
            timeLeft -= 10;
            questionNumber++;
        }
        
        // when an answer is clicked the next question appears after 0.5 seconds.
        setTimeout(delayedFunc,500);
        
        if (questionNumber === questions.length) {
            showEndScreen();
            timeLeft = 0;
        }
    });
    
    submitButton.addEventListener("click", function(e){
        e.preventDefault();
        // Saves their score locally and lists it on the "highscores" page.
        var savedScore = localStorage.setItem("savedScore", score);

        var initials = localStorage.setItem("initials", initialBox.value.trim());

        retrievedInitials = localStorage.getItem("initials");
        retrievedScore = localStorage.getItem("savedScore");
        var recentEntry = {name: [retrievedInitials],
                         score: [retrievedScore]};
        scoreboard.push(recentEntry);
            
            localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
            var retrievedScoreBoard = JSON.parse(localStorage.getItem(scoreboard));
            console.log(retrievedScoreBoard);
        })
        
                // There is a button with the option of resetting the leaderboard
        
      clearBtn.addEventListener("click", function(){
            scoreboard = [];
        });