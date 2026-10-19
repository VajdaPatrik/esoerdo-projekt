const allQuestions = [
    {
        question: "Hol találhatók a trópusi esőerdők?",
        answers: [
            "A sarkvidékeken",
            "Az Egyenlítő közelében",
            "A sivatagok közepén"
        ],
        correct: 1
    },
    {
        question: "Milyen az esőerdők éghajlata?",
        answers: [
            "Meleg és csapadékos",
            "Hideg és száraz",
            "Mindig fagyos"
        ],
        correct: 0
    },
    {
        question: "Melyik állat élhet az esőerdőben?",
        answers: [
            "Jegesmedve",
            "Pingvin",
            "Jaguár"
        ],
        correct: 2
    },
    {
        question: "Melyik növény terméséből készül a csokoládé?",
        answers: [
            "Kakaófa",
            "Banánfa",
            "Kókuszpálma"
        ],
        correct: 0
    },
    {
        question: "Mi az esőerdők egyik fontos szerepe?",
        answers: [
            "A sivatagok növelése",
            "Az élővilág sokféleségének fenntartása",
            "A csapadék megszüntetése"
        ],
        correct: 1
    },
    {
        question: "Melyik állatnak van gyakran hosszú farka és ügyes keze?",
        answers: [
            "Majom",
            "Pingvin",
            "Fóka"
        ],
        correct: 0
    },
    {
        question: "Mit nevezünk liánnak?",
        answers: [
            "Egy nagytestű madarat",
            "Egy folyótípust",
            "Kúszó, fás szárú növényt"
        ],
        correct: 2
    },
    {
        question: "Mi veszélyezteti az esőerdőket?",
        answers: [
            "Az erdőirtás",
            "A túl sok hó",
            "A jéghegyek olvadása"
        ],
        correct: 0
    },
    {
        question: "Melyik kontinensen található az Amazonas esőerdője?",
        answers: [
            "Európában",
            "Dél-Amerikában",
            "Antarktiszon"
        ],
        correct: 1
    },
    {
        question: "Melyik növényre jellemző a nagy, banánhoz hasonló levél?",
        answers: [
            "Banánnövény",
            "Kaktusz",
            "Fenyő"
        ],
        correct: 0
    }
];

function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

let questions = shuffle(allQuestions);

let currentQuestion = 0;
let points = 0;
let selectedAnswer = null;

const quiz = document.querySelector("#quiz");
const result = document.querySelector("#result");
const questionNumber = document.querySelector("#questionNumber");
const questionText = document.querySelector("#question");
const answersDiv = document.querySelector("#answers");
const nextButton = document.querySelector("#nextButton");
const progress = document.querySelector("#progress");

function showQuestion() {
    selectedAnswer = null;
    nextButton.disabled = true;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        ` ${currentQuestion + 1}. kérdés / ${questions.length}`;

    questionText.textContent = q.question;
    answersDiv.innerHTML = "";

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "btn btn-outline-success text-start";
        button.textContent = `${String.fromCharCode(65 + index)}) ${answer}`;

        button.addEventListener("click", () => {
            selectedAnswer = index;

            answersDiv.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            nextButton.disabled = false;
        });

        button.setAttribute("aria-pressed", "false");
        answersDiv.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Eredmény megtekintése"
            : "Következő kérdés";
}

nextButton.addEventListener("click", () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correct) {
        points++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        quiz.classList.add("d-none");
        result.classList.remove("d-none");

        progress.style.width = "100%";

        document.querySelector("#score").textContent =
            `${points} / ${questions.length} pont`;

        document.querySelector("#percentage").textContent =
            `${Math.round(points / questions.length * 100)}%`;
    }
});

document.querySelector("#restartButton").addEventListener("click", () => {
    questions = shuffle(allQuestions);

    currentQuestion = 0;
    points = 0;
    selectedAnswer = null;

    result.classList.add("d-none");
    quiz.classList.remove("d-none");

    showQuestion();
});

showQuestion();