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

var timeLeft = 20;
var questionNumber = 0;
var score = 0;

// When the start button is pressed a timer starts

timerEl.textContent = timeLeft;
function countdownTimer () {
    
    
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
       
        if (timeLeft <= 0){
            
            questionEl.setAttribute("class", "hide");
            endScreen.setAttribute("class", "");
            timerEl.textContent = ``;
            finalScore.textContent = score;
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
    
    questionEl.setAttribute("class", "hide");
    nextQuestion ();
    answerFeedback.textContent ="";
};

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
        if (timeLeft > 10){
            timeLeft -= 10;
        } else{
            timeLeft = 0;
        }       
        questionNumber++;
    }
    
    // when an answer is clicked the next question appears after 0.5 seconds.
    setTimeout(delayedFunc,500);


});

// repeats until all questions have been answered, or time runs out

// Gives the user the option of entering their intials


// Saves their score locally and lists it on the "highscores" page.
// There is a button with the option of resetting the leaderboard. 