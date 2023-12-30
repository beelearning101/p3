const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let score = 0;
let corrections = [];

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  document.getElementById("corrections").innerText = "";
  corrections.splice(0, corrections.length);
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText =
    currentQuestionIndex + 1 + ") " + question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  let correctAnswer;
  let mistakenAnswer = selectedButton.innerText;

  mistakenAnswer = selectedButton.dataset.text;
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    if (button.dataset.correct) {
      correctAnswer = button.innerText;
    }
  });
  // set background color to reflect if answer is correct or not
  setStatusClass(document.body, correct);

  if (correct) {
    score++;
  } else {
    // record corrections for report at end
    corrections.push(
      (currentQuestionIndex + 1).toString() +
        ") " +
        shuffledQuestions[currentQuestionIndex].question +
        " (選了: " +
        selectedButton.innerText +
        " ; 應該是 " +
        correctAnswer +
        ")\n"
    );
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText =
      "共 " +
      shuffledQuestions.length +
      " 題, " +
      "答對 " +
      score +
      " 題  \n [*重新開始*]";
    startButton.classList.remove("hide");
    document.getElementById("corrections").innerText = corrections
      .toString()
      .replaceAll(",", "");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  let img = document.getElementById("img");

  if (correct) {
    element.classList.add("correct");
    img.src = "tick.png";
  } else {
    element.classList.add("wrong");
    img.src = "cross.png";
  }
}

function clearStatusClass(element) {
  document.getElementById("img").src = "";
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "There is a __________ of biscuits.",
    answers: [
      { text: "packet", correct: true },
      { text: "bottle", correct: false },
      { text: "tub", correct: false },
      { text: "can", correct: false },
    ],
  },
  {
    question: "There is a __________ of butter.",
    answers: [
      { text: "packet", correct: false },
      { text: "bottle", correct: false },
      { text: "tub", correct: true },
      { text: "can", correct: false },
    ],
  },
  {
    question: "There is a __________ of water.",
    answers: [
      { text: "packet", correct: false },
      { text: "bottle", correct: true },
      { text: "tub", correct: false },
      { text: "can", correct: false },
    ],
  },
  {
    question: "There is a __________ of cola.",
    answers: [
      { text: "packet", correct: false },
      { text: "bottle", correct: false },
      { text: "tub", correct: false },
      { text: "can", correct: true },
    ],
  },
  {
    question: "There is a __________ of milk. 有一盒奶",
    answers: [
      { text: "packet", correct: false },
      { text: "bottle", correct: false },
      { text: "tub", correct: false },
      { text: "carton", correct: true },
    ],
  },
  {
    question:
      "There are ___________ oranges at home. We need to buy some more at the supermarket.",
    answers: [
      { text: "a little", correct: false },
      { text: "a lot of", correct: false },
      { text: "a few", correct: true },
      { text: "an", correct: false },
    ],
  },
  {
    question:
      "There is ___________ milk in the fridge. We need to get some more.",
    answers: [
      { text: "a little", correct: true },
      { text: "a lot of", correct: false },
      { text: "a few", correct: false },
      { text: "an", correct: false },
    ],
  },
  {
    question: " ___________  salad would you like?",
    answers: [
      { text: "Is there", correct: false },
      { text: "Are there", correct: false },
      { text: "How many", correct: false },
      { text: "How much", correct: true },
    ],
  },
  {
    question: "How many sandwiches __________?",
    answers: [
      { text: "is there", correct: false },
      { text: "are there", correct: true },
      { text: "there is", correct: false },
      { text: "there are", correct: false },
    ],
  },
  {
    question: "How much spaghetti __________?",
    answers: [
      { text: "is there", correct: true },
      { text: "are there", correct: false },
      { text: "there is", correct: false },
      { text: "there are", correct: false },
    ],
  },
  {
    question: "很多蔬菜",
    answers: [
      { text: "a little vegetable", correct: false },
      { text: "a few vegetables", correct: false },
      { text: "a lot of vegetable", correct: false },
      { text: "a lot of vegetables", correct: true },
    ],
  },
  {
    question: "很少肉",
    answers: [
      { text: "a little meat", correct: true },
      { text: "a few meats", correct: false },
      { text: "a lot of meat", correct: false },
      { text: "a lot of meats", correct: false },
    ],
  },
  {
    question: "很少麵包",
    answers: [
      { text: "a little breads", correct: false },
      { text: "a lot of breads", correct: false },
      { text: "a few breads", correct: false },
      { text: "a little bread", correct: true },
    ],
  },
  {
    question: "________________ the light after use.",
    answers: [
      { text: "Turn on", correct: false },
      { text: "Turn off", correct: true },
      { text: "Put up", correct: false },
      { text: "Throw away", correct: false },
    ],
  },
  {
    question: "________________ the grass in the park.",
    answers: [
      { text: "Unplug", correct: false },
      { text: "Tidy up", correct: false },
      { text: "Put up", correct: false },
      { text: "Keep off", correct: true },
    ],
  },
  {
    question: "________________ is Sara?   She is 135 centimetres.",
    answers: [
      { text: "How often", correct: false },
      { text: "How heavy", correct: false },
      { text: "How tall", correct: true },
      { text: "How old", correct: false },
    ],
  },
  {
    question: "________________ is your dog?   It is 12 kilograms.",
    answers: [
      { text: "How often", correct: false },
      { text: "How heavy", correct: true },
      { text: "How tall", correct: false },
      { text: "How old", correct: false },
    ],
  },
  {
    question:
      "Let's keep the cardboard boxes. We can ______________ them to store our old toys .",
    answers: [
      { text: "recycle", correct: false },
      { text: "reuse", correct: true },
      { text: "decide", correct: false },
      { text: "reduce", correct: false },
    ],
  },
  {
    question: "We should ___________ the use of energy.",
    answers: [
      { text: "recycle", correct: false },
      { text: "reuse", correct: false },
      { text: "decide", correct: false },
      { text: "reduce", correct: true },
    ],
  },
  {
    question: "It is sunny today. We ____________ to go on a picnic.",
    answers: [
      { text: "decide", correct: true },
      { text: "want", correct: false },
      { text: "try", correct: false },
      { text: "toss", correct: false },
    ],
  },
  {
    question: "We are shopping __________ our class party in the supermarket.",
    answers: [
      { text: "in", correct: false },
      { text: "on", correct: false },
      { text: "for", correct: true },
      { text: "at", correct: false },
    ],
  },
  {
    question: "After the picnic, I feel happy __________ tired.",
    answers: [
      { text: "and", correct: false },
      { text: "or", correct: false },
      { text: "at", correct: false },
      { text: "but", correct: true },
    ],
  },
];
