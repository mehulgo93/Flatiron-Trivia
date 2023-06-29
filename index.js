
let currentQuestionIndex = 0;
let score = 0;

let questionElement = document.getElementById("question");
let optionsElement = document.getElementById("options");
let resultElement = document.getElementById("result");
let submitButton = document.getElementById("submit");

// Fetch the JSON data from db.json
fetch("http://localhost:3000/questions")
  .then(response => response.json())
  .then(data => {
    // Assign the questions from the JSON data to the 'questions' variable
    let questions = data.questions;

    // Function to display the current question
    function displayQuestion() {
      let currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      optionsElement.innerHTML = "";

      currentQuestion.options.forEach(function(option, index) {
        let optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.addEventListener("click", function() {
          handleAnswer(index);
        });
        optionsElement.appendChild(optionElement);
      });
    }

    // Function to handle the user's answer
    function handleAnswer(selectedIndex) {
      let currentQuestion = questions[currentQuestionIndex];
      if (selectedIndex === currentQuestion.answer) {
        score++;
        resultElement.textContent = "Correct!";
      } else {
        resultElement.textContent = "Wrong!";
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        showFinalScore();
      }
    }

    // Function to show the final score
    function showFinalScore() {
      questionElement.textContent = "";
      optionsElement.innerHTML = "";
      submitButton.style.display = "none";
      resultElement.textContent = "Your score: " + score + " out of " + questions.length;
    }

    // Start the game
    displayQuestion();
  })
  .catch(error => console.error("Error fetching JSON data:", error));

