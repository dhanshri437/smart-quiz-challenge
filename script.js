const questions = [
  {
    question: "Which language is known as the backbone of web development?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
    hint: "It's used on both front-end and back-end of many websites."
  },
  {
    question: "What does HTML stand for?",
    options: ["HighText Machine Language", "HyperText Markup Language", "HyperTransfer Mark Language", "None of the above"],
    answer: "HyperText Markup Language",
    hint: "It's the structure of web pages."
  },
  {
    question: "What is the symbol used for comments in CSS?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "/* */",
    hint: "CSS uses C-style multiline comments."
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["HTML", "Java", "Python", "C#"],
    answer: "HTML",
    hint: "It's a markup language, not for logic or computation."
  },
  {
    question: "Which method is used to print in JavaScript?",
    options: ["print()", "console.log()", "echo()", "write()"],
    answer: "console.log()",
    hint: "Used mostly for debugging in browser dev tools."
  }
];

let currentQuestion = 0;
let timer;
let timeLeft = 30;

const questionBox = document.getElementById('question-box');
const optionsBox = document.getElementById('options-box');
const feedbackBox = document.getElementById('feedback-box');
const hintBox = document.getElementById('hint-box');
const timerDisplay = document.getElementById('timer-display');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft === 0) {
      clearInterval(timer);
      feedbackBox.innerText = "⏰ Time's up!";
      showHint();
      setTimeout(loadNextQuestion, 3000);
    }
  }, 1000);

  const q = questions[currentQuestion];
  questionBox.innerText = q.question;
  optionsBox.innerHTML = "";
  feedbackBox.innerText = "";
  hintBox.innerText = "";

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.innerText = option;
    btn.addEventListener('click', () => checkAnswer(option));
    optionsBox.appendChild(btn);
  });
}

function updateTimerDisplay() {
  timerDisplay.innerText = `⏱️ Time Left: ${timeLeft}s`;
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    feedbackBox.innerText = "✅ Correct!";
    hintBox.innerText = "";
    setTimeout(loadNextQuestion, 2000);
  } else {
    feedbackBox.innerText = "❌ Try Again!";
    showHint();
  }
}

function showHint() {
  hintBox.innerText = "💡 Hint: " + questions[currentQuestion].hint;
}

function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionBox.innerText = "🎉 Quiz Completed!";
  optionsBox.innerHTML = "";
  feedbackBox.innerText = "";
  hintBox.innerText = "";
  timerDisplay.innerText = "";
  restartBtn.style.display = "block";
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();
