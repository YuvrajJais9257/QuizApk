const questions = [
    {
        question: "Which villain killed Spider-Man's first love interest, Gwen Stacy?",
        answers: [
            { text: "Green Goblin", correct: true },
            { text: "Doctor Octopus", correct: false },
            { text: "Venom", correct: false },
        ]
    },
    {
        question: "What is the name of the symbiote that bonded with Spider-Man and later became Venom?",
        answers: [
            { text: "Carnage", correct: false },
            { text: "Riot", correct: false },
            { text: "Venom", correct: true },
        ]
    },
    {
        question: "Which comic book issue marked the first appearance of Spider-Man?",
        answers: [
            { text: "Amazing Fantasy #15", correct: true },
            { text: "The Amazing Spider-Man #1", correct: false },
            { text: "Spider-Man: Homecoming #1", correct: false },
        ]
    },
    {
        question: "Who was the first character to take on the mantle of Spider-Man after Peter Parker?",
        answers: [
            { text: "Miles Morales", correct: true },
            { text: "Ben Reilly", correct: false },
            { text: "Miguel O'Hara", correct: false },
        ]
    },
    {
        question: "What is the name of Spider-Man's clone?",
        answers: [
            { text: "Ben Reilly", correct: true },
            { text: "Harry Osborn", correct: false },
            { text: "Eddie Brock", correct: false },
        ]
    },
    {
        question: "Who was responsible for the death of Ben Parker, Spider-Man's uncle?",
        answers: [
            { text: "Green Goblin", correct: false },
            { text: "Sandman", correct: false },
            { text: "The Burglar", correct: true },
        ]
    },
    {
        question: "Which superhero team was Spider-Man briefly a member of during the 'Secret Wars' storyline?",
        answers: [
            { text: "The Avengers", correct: false },
            { text: "The X-Men", correct: false },
            { text: "The Secret Wars", correct: true },
        ]
    },
    {
        question: "Who is the editor-in-chief of the Daily Bugle in the Spider-Man comics?",
        answers: [
            { text: "J. Jonah Jameson", correct: true },
            { text: "Perry White", correct: false },
            { text: "Robbie Robertson", correct: false },
        ]
    },
    {
        question: "What is the name of the high school attended by Peter Parker in the Spider-Man comics?",
        answers: [
            { text: "Midtown High School", correct: true },
            { text: "Empire State High School", correct: false },
            { text: "Oscorp Academy", correct: false },
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your Score is: ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Retry";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();