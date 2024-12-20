//your JS code here.
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        correct: "Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correct: "Pacific"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: "Vatican City"
    }
];

// Render questions on page load
function renderQuiz() {
    const quizForm = document.getElementById("quiz-form");

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = q.question;

        const options = q.options.map((option, i) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            input.id = `q${index}opt${i}`;

            // Check if the answer was previously saved in sessionStorage
            const savedAnswer = sessionStorage.getItem(`question${index}`);
            if (savedAnswer && savedAnswer === option) {
                input.checked = true;
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            return label;
        });

        // Append all options and question text to the div
        questionDiv.appendChild(questionText);
        options.forEach(option => questionDiv.appendChild(option));

        // Append question div to form
        quizForm.appendChild(questionDiv);
    });
}

// Save progress to session storage
function saveProgress() {
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            sessionStorage.setItem(`question${index}`, selectedOption.value);
        }
    });
}

// Calculate score
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = sessionStorage.getItem(`question${index}`);
        if (selectedAnswer === q.correct) {
            score++;
        }
    });
    return score;
}

// Display score
function displayScore() {
    const score = calculateScore();
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = `Your score is ${score} out of 5.`;

    // Store score in localStorage
    localStorage.setItem("score", score);
}

// Event listeners
document.getElementById("submit-btn").addEventListener("click", () => {
    saveProgress();
    displayScore();
});

// Load quiz on page load
window.onload = renderQuiz;

// Optionally, display previously stored score if available
window.onload = () => {
    renderQuiz();
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
        document.getElementById("score-container").textContent = `Your last score was ${savedScore} out of 5.`;
    }
};
