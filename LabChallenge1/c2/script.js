const timerDisplay = document.getElementById('timerDisplay');
const timerForm = document.getElementById('timerForm');
const durationInput = document.getElementById('duration');
const celebration = document.getElementById('celebration');

let countdown;

timerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const seconds = parseInt(durationInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        return;
    }

    clearInterval(countdown);
    startTimer(seconds);
    durationInput.value = '';
});

function startTimer(seconds) {
    celebration.classList.remove('animate');
    timerDisplay.style.display = 'block';

    const endTime = Date.now() + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.style.display = 'none';
            celebration.classList.add('animate');
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSeconds = seconds % 60;
    
    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    
    timerDisplay.textContent = display;
    document.title = display;
}
