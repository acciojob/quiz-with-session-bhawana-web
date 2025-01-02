//your JS code here.
// Questions and Options
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2 // index of the correct option
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: 1
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correct: 1
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo", "Nikola Tesla"],
    correct: 1
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Ozone", "Opium"],
    correct: 0
  }
];

// Load quiz and user's progress from session storage
const loadQuiz = () => {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = ""; // Clear any previous content

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = q.question;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach((option, i) => {
      const optionLabel = document.createElement("label");

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question${index}`;
      optionInput.value = i;

      if (sessionStorage.getItem(`question${index}`) == i) {
        optionInput.checked = true;
      }

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));

      optionsDiv.appendChild(optionLabel);
    });

    questionDiv.appendChild(questionTitle);
    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
  });
};

// Save progress in session storage
const saveProgress = () => {
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption) {
      sessionStorage.setItem(`question${index}`, selectedOption.value);
    }
  });
};

// Calculate score and save to local storage
const submitQuiz = () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selectedOption = sessionStorage.getItem(`question${index}`);
    if (selectedOption && parseInt(selectedOption) === q.correct) {
      score++;
    }
  });

  localStorage.setItem('score', score); // Save score to local storage
  document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
};

// Load quiz on page load
window.onload = loadQuiz;

// Save progress on change in radio button selection
document.addEventListener("change", saveProgress);
