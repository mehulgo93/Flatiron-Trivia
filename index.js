// Fetch the questions from the JSON server
fetch('http://localhost:3000/questions')
  .then(response => response.json())
  .then(questions => {
    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const submitButton = document.getElementById('submit');
    const resultContainer = document.getElementById('result');

    // Display the current question and options
    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionContainer.textContent = currentQuestion.question;

      optionsContainer.innerHTML = '';
      currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionsContainer.appendChild(optionElement);

        // Add event listeners to each option
        optionElement.addEventListener('click', selectOption);
        optionElement.addEventListener('mouseover', handleMouseOver);
        optionElement.addEventListener('mouseout', handleMouseOut);
      });
    }

    // Handle option selection
    function selectOption(event) {
      const selectedOption = event.target;
      const selectedIndex = selectedOption.dataset.index;
      const currentQuestion = questions[currentQuestionIndex];

      // Add styles to the selected option
      optionsContainer.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
      });
      selectedOption.classList.add('selected');

      // Enable the submit button
      submitButton.disabled = false;

      // Check if the selected option is correct
      if (parseInt(selectedIndex) === currentQuestion.answer) {
        selectedOption.classList.add('correct');
      } else {
        selectedOption.classList.add('incorrect');
      }
    }

    // Handle submission of the answer
    function submitAnswer() {
      const selectedOption = optionsContainer.querySelector('.selected');
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedOption) {
        // Disable the submit button
        submitButton.disabled = true;

        // Disable option selection
        optionsContainer.querySelectorAll('.option').forEach(option => {
          option.removeEventListener('click', selectOption);
          option.removeEventListener('mouseover', handleMouseOver);
          option.removeEventListener('mouseout', handleMouseOut);
        });

        // Check if the selected option is correct
        if (parseInt(selectedOption.dataset.index) === currentQuestion.answer) {
          score++;
          selectedOption.classList.add('correct');
          resultContainer.textContent = 'Correct!';
          resultContainer.style.color = 'rgb(0, 255, 0)';
        } else {
          selectedOption.classList.add('incorrect');
          resultContainer.textContent = 'Incorrect!';
          resultContainer.style.color = 'rgb(255, 0, 0)';
        }

        // Move to the next question after a delay
        setTimeout(() => {
          nextQuestion();
        }, 1000);
      }
    }

    // Move to the next question
    function nextQuestion() {
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resultContainer.textContent = '';

        // Enable option selection for the next question
        optionsContainer.querySelectorAll('.option').forEach(option => {
          option.addEventListener('click', selectOption);
          option.addEventListener('mouseover', handleMouseOver);
          option.addEventListener('mouseout', handleMouseOut);
          option.classList.remove('selected', 'correct', 'incorrect');
        });

        // Enable the submit button for the next question
        submitButton.disabled = false;
      } else {
        // Display the final score
        const percentage = (score / questions.length) * 100;
        resultContainer.textContent = `Final Score: ${score}/${questions.length} (${percentage}%)`;

        // Check if the participant got a perfect score
        if (score === questions.length) {
          // Add the congratulations image
          const congratulationsImg = document.createElement('img');
          congratulationsImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCa5zD0wgE-pYkG79Pr648a6cTaNnJB97HQw&usqp=CAU';
          congratulationsImg.alt = alert('Congratulations, You Chose Wisely!')
          congratulationsImg.style.width = '300px';
          congratulationsImg.style.marginTop = '20px auto';
          resultContainer.appendChild(congratulationsImg);
        }

        submitButton.disabled = true;
      }
    }

    // Handle mouseover event
    function handleMouseOver(event) {
      event.target.classList.add('highlight');
      event.target.style.backgroundColor = 'lightblue';
    }

    // Handle mouseout event
    function handleMouseOut(event) {
      event.target.classList.remove('highlight');
      event.target.style.backgroundColor = '';
    }

    // Event listeners
    submitButton.addEventListener('click', submitAnswer);

    // Display the first question
    displayQuestion();
  })
  .catch(error => {
    console.error('Error:', error);
  });
