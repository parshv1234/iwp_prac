document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: ["font-color", "text-color", "color", "font-style"],
            answer: "color"
        },
        {
            question: "Which JavaScript keyword is used to declare a variable that cannot be reassigned?",
            options: ["var", "let", "const", "static"],
            answer: "const"
        },
        {
            question: "What is the correct place to insert a JavaScript file in an HTML document?",
            options: ["The <head> section", "The <body> section", "Both the <head> and <body> section are correct", "The <footer> section"],
            answer: "Both the <head> and <body> section are correct"
        }
    ];

    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const quizForm = document.getElementById('quiz-form');
    const timerEl = document.getElementById('timer');
    const questionCounterEl = document.getElementById('question-counter');

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const clearBtn = document.getElementById('clear-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');

    const scoreModalOverlay = document.getElementById('score-modal-overlay');
    const finalScoreEl = document.getElementById('final-score');
    const timeTakenEl = document.getElementById('time-taken');
    const playAgainBtn = document.getElementById('play-again-btn');
    const viewScorecardBtn = document.getElementById('view-scorecard-btn');

    const confirmModalOverlay = document.getElementById('confirm-modal-overlay');
    const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
    const confirmSubmitBtn = document.getElementById('confirm-submit-btn');

    const INITIAL_TIME = 60;
    let timer;
    let timeLeft = INITIAL_TIME;
    let currentQuestionIndex = 0;
    let isQuizFinished = false;

    function renderQuiz() {
        let quizHTML = '';
        quizData.forEach((q, index) => {
            quizHTML += `
                <div class="question-block" id="question-${index}" style="display: none;">
                    <p>${index + 1}. ${q.question}</p>
                    <div class="options-container">
                        ${q.options.map(option => `
                            <label class="option">
                                <input type="radio" name="question${index}" value="${option}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <div class="result" id="result-${index}"></div>
                </div>
            `;
        });
        quizForm.innerHTML = quizHTML;
        showQuestion(currentQuestionIndex);
    }
    
    function showQuestion(index) {
        document.querySelectorAll('.question-block').forEach(block => {
            block.style.display = 'none';
        });
        const questionToShow = document.getElementById(`question-${index}`);
        if (questionToShow) {
            questionToShow.style.display = 'block';
        }
        updateNavigation();
    }

    function updateNavigation() {
        questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
        submitQuizBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'inline-block' : 'none';
        nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            timerEl.textContent = `Time Left: ${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timerEl.textContent = "Time Over!";
                checkAnswers(true);
            }
        }, 1000);
    }

    function showScoreModal(score, total) {
        const timeTaken = INITIAL_TIME - timeLeft;
        finalScoreEl.textContent = `You scored ${score} out of ${total}!`;
        timeTakenEl.textContent = `Time Taken: ${timeTaken} seconds`;
        scoreModalOverlay.style.display = 'flex';
    }

    function checkAnswers(timeUp = false) {
        isQuizFinished = true;
        clearInterval(timer);
        let score = 0;

        const radioButtons = quizForm.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.disabled = true);

        quizData.forEach((q, index) => {
            const resultEl = document.getElementById(`result-${index}`);
            const selectedOption = quizForm.querySelector(`input[name="question${index}"]:checked`);
            
            if (selectedOption) {
                if (selectedOption.value === q.answer) {
                    score++;
                    resultEl.textContent = "Correct!";
                    resultEl.classList.add('correct');
                } else {
                    resultEl.textContent = `Incorrect! Correct answer: ${q.answer}`;
                    resultEl.classList.add('incorrect');
                }
            } else {
                resultEl.textContent = "No answer selected.";
                resultEl.classList.add('incorrect');
            }
        });
        
        document.querySelector('.quiz-navigation').style.display = 'none';

        setTimeout(() => {
            showScoreModal(score, quizData.length);
        }, 1500);
    }
    
    function goToStartScreen() {
        isQuizFinished = false;
        clearInterval(timer);
        timeLeft = INITIAL_TIME;
        currentQuestionIndex = 0;
        
        document.body.style.overflow = 'hidden';
        scoreModalOverlay.style.display = 'none';
        quizContainer.style.display = 'none';
        startScreen.style.display = 'block';

        timerEl.textContent = 'Time Left: 01:00';
        quizForm.innerHTML = '';
        const nav = document.querySelector('.quiz-navigation');
        nav.style.display = 'flex';
        submitQuizBtn.textContent = 'Submit Quiz';
    }

    function clearCurrentResponse() {
        const radioButtons = document.querySelectorAll(`input[name="question${currentQuestionIndex}"]`);
        radioButtons.forEach(radio => radio.checked = false);
    }
    
    function viewScorecard() {
        scoreModalOverlay.style.display = 'none';
        quizContainer.style.display = 'block';
        document.body.style.overflow = 'auto'; // Allow scrolling
        document.querySelectorAll('.question-block').forEach(block => {
            block.style.display = 'block';
        });
        const nav = document.querySelector('.quiz-navigation');
        nav.style.display = 'flex';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        submitQuizBtn.textContent = 'Play Again';
        submitQuizBtn.style.display = 'inline-block';
        submitQuizBtn.removeEventListener('click', handleSubmit);
        submitQuizBtn.addEventListener('click', goToStartScreen, { once: true });
    }

    function handleSubmit() {
        confirmModalOverlay.style.display = 'flex';
    }

    function initializeQuiz() {
        document.body.style.overflow = 'hidden';
        startScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        renderQuiz();
        startTimer();
    }

    function setInitialState() {
        quizContainer.style.display = 'none';
        scoreModalOverlay.style.display = 'none';
        confirmModalOverlay.style.display = 'none';
        startScreen.style.display = 'block';
    }

    setInitialState();

    startBtn.addEventListener('click', initializeQuiz);
    playAgainBtn.addEventListener('click', goToStartScreen);
    viewScorecardBtn.addEventListener('click', viewScorecard);
    submitQuizBtn.addEventListener('click', handleSubmit);
    
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    clearBtn.addEventListener('click', clearCurrentResponse);

    confirmSubmitBtn.addEventListener('click', () => {
        confirmModalOverlay.style.display = 'none';
        checkAnswers(false);
    });

    cancelSubmitBtn.addEventListener('click', () => {
        confirmModalOverlay.style.display = 'none';
    });
});
