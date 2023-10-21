$(document).ready(function() {
    const questions = [
      {
        question: "Which US city is the sunniest major city, seeing more than 320 sunny days each year?",
        answers: [
          { text: "Miami", correct: false },
          { text: "Phoenix", correct: true },
          { text: "San Francisco", correct: false },
          { text: "Austin", correct: false },
        ]
      },
      {
        question: "What is the oldest soft drink in the United States?",
        answers: [
          { text: "Coca Cola", correct: false },
          { text: "Pepsi", correct: false },
          { text: "Dr. Pepper", correct: true },
          { text: "Canada Dry Ginger Ale", correct: false },
        ]
      },
      {
        question: "The first vaccination was for which disease?",
        answers: [
          { text: "Chickenpox", correct: false },
          { text: "Measels", correct: false },
          { text: "Polio", correct: false },
          { text: "Smallpox", correct: true },
        ]
      },
      {
        question: "Where did the croissant originate?",
        answers: [
          { text: "France", correct: false },
          { text: "Austria", correct: true },
          { text: "Turkey", correct: false },
          { text: "Russia", correct: false },
        ]
      },
      
    ];
  
    const questionElement = $("#question");
    const answerButtons = $("#answer-buttons");
    const nextButton = $("#next-btn");
  
    let currentQuestionIndex = 0;
    let score = 0;
  
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.html("Next");
      showQuestion();
    }
  
    function showQuestion() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.html(questionNo + ". " + currentQuestion.question);
  
      $.each(currentQuestion.answers, function(index, answer) {
        const button = $("<button></button>");
        button.html(answer.text);
        button.addClass("btn");
        answerButtons.append(button);
        if (answer.correct) {
          button.data("correct", answer.correct);
        }
        button.on("click", selectAnswer);
      });
    }
  
    function resetState() {
      nextButton.hide();
      answerButtons.empty();
    }
    function displayAnswerMessage(isCorrect) {
      const messageBox = $("#answer-message");
      messageBox.text(isCorrect ? "Correct!  You are da Bomb!" : "Incorrect!  You are a Loser!");
      messageBox.removeClass("correct incorrect");
      messageBox.addClass(isCorrect ? "correct" : "incorrect");
      messageBox.show();
    }
    function selectAnswer(e) {
      const selectedBtn = $(e.target);
      const isCorrect = selectedBtn.data("correct") === true;
      if (isCorrect) {
        selectedBtn.addClass("correct");
        score++;
      } else {
        selectedBtn.addClass("incorrect");
      }
      answerButtons.find("button").each(function() {
        if ($(this).data("correct") === true) {
          $(this).addClass("correct");
        }
        $(this).prop("disabled", true);
      });
      nextButton.show();
      displayAnswerMessage(isCorrect);
    }
  
    function showScore() {
      resetState();
      questionElement.html(`You scored ${score} out of ${questions.length}!`);
      nextButton.html("Play Again").show();
      
    }
  
    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
      $("#answer-message").hide();
    }
  
    nextButton.on("click", function() {
      if (currentQuestionIndex < questions.length) {
        handleNextButton();
      } else {
        startQuiz();
      }
    });
  
    startQuiz();
  });