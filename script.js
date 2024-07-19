var birthdate;
var birthtime;
var intervalId;
var countdownInterval;

const zodiacSigns = {
    "الجدي": {
        traits: "صلابة، عملية، منظمة",
        advice: "استمتع بالتحديات وابق متفائلاً."
    },
    "الدلو": {
        traits: "مبتكر، مستقل، غير تقليدي",
        advice: "ابحث عن التوازن بين الحرية والمسؤولية."
    },
    "الحوت": {
        traits: "حنون، خيالي، حساس",
        advice: "استغل وقتك للاسترخاء والتأمل."
    },
    "الحمل": {
        traits: "شجاع، طموح، عفوي",
        advice: "ابتعد عن التسرع وفكر قبل أن تتصرف."
    },
    "الثور": {
        traits: "ثابت، عملي، متسق",
        advice: "حاول أن تكون أكثر مرونة وافتح عقلك للجديد."
    },
    "الجوزاء": {
        traits: "متحرك، متفتح، فضولي",
        advice: "استمتع بالتواصل مع الآخرين وتبادل الأفكار."
    },
    "السرطان": {
        traits: "عاطفي، حساس، طموح",
        advice: "ابحث عن التوازن بين العاطفة والعقل."
    },
    "الأسد": {
        traits: "كريم، طموح، قيادي",
        advice: "ابتعد عن الأنانية واستمتع بالعمل الجماعي."
    },
    "العذراء": {
        traits: "منظم، متأني، تحليلي",
        advice: "لا تنسى أن تسترخي وتستمتع بالحياة."
    },
    "الميزان": {
        traits: "جمالي، عادل، متوازن",
        advice: "ابحث عن التوازن في جميع مجالات حياتك."
    },
    "العقرب": {
        traits: "قوي، عميق، غامض",
        advice: "حاول أن تكون أكثر انفتاحاً وتواصل مع الآخرين."
    },
    "القوس": {
        traits: "متحمس، مغامر، طموح",
        advice: "ابتعد عن التهور وفكر في العواقب."
    }
};

function showSection(section) {
    document.getElementById('ageSection').classList.add('hidden');
    document.getElementById('zodiacSection').classList.add('hidden');
    document.getElementById(section + 'Section').classList.remove('hidden');
}

function calculateAge() {
    var birthdateString = document.getElementById('birthdate').value;
    var birthtimeString = document.getElementById('birthtime').value;
    if (!birthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }
    if (!birthtimeString) {
        alert('يرجى إدخال ساعة الميلاد.');
        return;
    }

    birthdate = new Date(birthdateString + 'T' + birthtimeString);
    var today = new Date();

    if (today < birthdate) {
        alert('تاريخ الميلاد يجب أن يكون قبل اليوم.');
        return;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(updateAge, 1000);
    updateAge();
    calculateNextBirthday();
    const customAdvice = getCustomAdvice(new Date().getFullYear() - birthdate.getFullYear());
    updateResultTable('ageResultTable', 'نصيحة مخصصة', customAdvice);
}

function updateResultTable(tableId, key, value) {
    var table = document.getElementById(tableId);
    table.style.display = 'table';
    
    var cellId = key.replace(/\s+/g, ''); // Remove spaces to form a valid ID
    var cell = document.getElementById(cellId);
    if (cell) {
        cell.textContent = value;
    }
}

function updateAge() {
    var today = new Date();
    var ageMilliseconds = today - birthdate;
    
    // حساب السنوات والأشهر والأيام بدقة
    var years = today.getFullYear() - birthdate.getFullYear();
    var months = today.getMonth() - birthdate.getMonth();
    var days = today.getDate() - birthdate.getDate();

    // تصحيح الحسابات إذا كان اليوم الحالي قبل يوم الميلاد في الشهر الحالي
    if (days < 0) {
        months--;
        var lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // تصحيح الحسابات إذا كان الشهر الحالي قبل شهر الميلاد
    if (months < 0) {
        years--;
        months += 12;
    }

    // حساب الأسابيع والأيام المتبقية
    var totalDays = Math.floor(ageMilliseconds / (1000 * 60 * 60 * 24));
    var weeks = Math.floor(totalDays / 7);
    var remainingDays = totalDays % 7;

    // حساب الساعات والدقائق والثواني
    var hours = today.getHours() - birthdate.getHours();
    var minutes = today.getMinutes() - birthdate.getMinutes();
    var seconds = today.getSeconds() - birthdate.getSeconds();

    // تصحيح الحسابات للساعات والدقائق والثواني
    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }
    if (hours < 0) {
        days--;
        hours += 24;
    }

    // تحديث جدول النتائج
    updateResultTable('ageResultTable', 'عمرك', `${years} سنة و ${months} أشهر و ${days} أيام و ${hours} ساعات و ${minutes} دقائق و ${seconds} ثواني`);
    updateResultTable('ageResultTable', 'العمر بالأشهر', `${years * 12 + months} أشهر و ${days} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأسابيع', `${weeks} أسابيع و ${remainingDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأيام', `${totalDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالساعات', `${Math.floor(ageMilliseconds / (1000 * 60 * 60))} ساعات`);
    updateResultTable('ageResultTable', 'العمر بالدقائق', `${Math.floor(ageMilliseconds / (1000 * 60))} دقائق`);
    updateResultTable('ageResultTable', 'العمر بالثواني', `${Math.floor(ageMilliseconds / 1000)} ثواني`);
}

function calculateNextBirthday() {
    var today = new Date();
    var nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(function() {
        var now = new Date();
        var timeDifference = nextBirthday - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateResultTable('ageResultTable', 'عيد ميلادك القادم', 'عيد ميلادك اليوم!');
            return;
        }

        var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        updateResultTable('ageResultTable', 'عيد ميلادك القادم', `${days} يوم, ${hours} ساعة, ${minutes} دقيقة, ${seconds} ثانية`);
    }, 1000);
}

function calculateZodiac() {
    var zodiacBirthdateString = document.getElementById('zodiacBirthdate').value;
    if (!zodiacBirthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }

    var zodiacBirthdate = new Date(zodiacBirthdateString);
    findZodiacSign(zodiacBirthdate);
}

function findZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let zodiacSign = '';

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        zodiacSign = "الدلو";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        zodiacSign = "الحوت";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        zodiacSign = "الحمل";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        zodiacSign = "الثور";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        zodiacSign = "الجوزاء";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        zodiacSign = "السرطان";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        zodiacSign = "الأسد";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        zodiacSign = "العذراء";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        zodiacSign = "الميزان";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        zodiacSign = "العقرب";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        zodiacSign = "القوس";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        zodiacSign = "الجدي";
    }

    const signInfo = zodiacSigns[zodiacSign];
    updateResultTable('zodiacResultTable', 'البرج', zodiacSign);
    updateResultTable('zodiacResultTable', 'صفات البرج', signInfo.traits);
    updateResultTable('zodiacResultTable', 'نصيحة البرج', signInfo.advice);
}

function updateResultTable(tableId, key, value) {
    var table = document.getElementById(tableId);
    table.style.display = 'table';
    
    var existingRow = Array.from(table.rows).find(row => row.cells[0].textContent === key);
    
    if (existingRow) {
        existingRow.cells[1].textContent = value;
    } else {
        var newRow = table.insertRow(-1);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = value;
    }
}

function randomizeBirthTime() {
    var randomHour = Math.floor(Math.random() * 24);
    var randomMinute = Math.floor(Math.random() * 60);
    var birthtime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
    document.getElementById('birthtime').value = birthtime;
}

function contactDeveloper() {
    window.location.href = 'https://wa.me/2001104865607';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var toggleButton = document.querySelector('.toggle-dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';
    } else {
        toggleButton.textContent = '☀️';
    }
}

function getCustomAdvice(age) {
    if (age < 13) {
        return "احرص على طاعة والديك وأداء واجباتك المدرسية بإتقان.";
    } else if (age < 20) {
        return "تقرب إلى الله ولا تنس صلواتك. استثمر وقتك في تطوير مهاراتك وتحديد أهدافك المستقبلية.";
    } else if (age < 30) {
        return "ابحث عن فرص لتطوير حياتك المهنية وفكر في بناء مستقبلك.";
    } else if (age < 40) {
        return "عامل أولادك باحترام وعلمهم العبادات. اهتم بصحتك البدنية والنفسية.";
    } else if (age < 50) {
        return "حافظ على التوازن بين العمل والحياة الشخصية. اهتم بتغذيتك وممارسة الرياضة بانتظام.";
    } else if (age < 60) {
        return "فكر في التخطيط لتقاعدك واستثمر في علاقاتك العائلية.";
    } else {
        return "استمتع بوقتك مع العائلة والأحفاد. شارك خبراتك وحكمتك مع الآخرين.";
    }
}

// JavaScript code for the Tik Tak Toe game
const cells = document.querySelectorAll('.tik-tak-toe-cell');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const tieScoreElem = document.getElementById('tie-score');
const restartBtn = document.getElementById('restart-btn');
const soundBtn = document.getElementById('sound-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { player: 0, computer: 0, tie: 0 };
let isSoundOn = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Audio elements
const placeSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
const winSound = new Audio('https://freesound.org/people/DeletedUser1115286/sounds/455921/download/455921__deleteduser1115286__success-fanfare-trumpets.mp3');
const tieSound = new Audio('https://freesound.org/people/ProjectsU012/sounds/341695/download/341695__projectsu012__retro-game-over.wav');

cells.forEach(cell => cell.addEventListener('click', handlePlayerMove));
restartBtn.addEventListener('click', restartGame);
soundBtn.addEventListener('click', toggleSound);

function handlePlayerMove(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || checkWin() || checkTie()) return;
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('played', currentPlayer.toLowerCase());
    playPlaceSound(); // Play sound when a move is placed

    if (checkWin()) {
        updateScore('player');
        playWinSound(); // Play win sound
        return;
    }
    if (checkTie()) {
        updateScore('tie');
        playTieSound(); // Play tie sound
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setTimeout(computerMove, 500);  // Adding delay for better UX
}

function computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = 'O';
    updateBoard(move, 'O');
    if (checkWin()) {
        updateScore('computer');
        playWinSound(); // Play win sound
        return;
    }
    if (checkTie()) {
        updateScore('tie');
        playTieSound(); // Play tie sound
        return;
    }
    currentPlayer = 'X';
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return result === 'tie' ? 0 : result === 'X' ? -1 : 1;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function updateBoard(index, player) {
    cells[index].textContent = player;
    cells[index].classList.add('played', player.toLowerCase(), 'animate'); // Add 'animate' class
    // Ensure the transition triggers smoothly
    setTimeout(() => {
        cells[index].classList.remove('played', player.toLowerCase(), 'animate'); // Remove 'animate' class after animation
    }, 300); // Adjust timing to match animation duration
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function checkTie() {
    return board.every(cell => cell !== '');
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'tie';
}

function updateScore(winner) {
    if (winner === 'player') {
        scores.player++;
        playerScoreElem.textContent = scores.player;
    } else if (winner === 'computer') {
        scores.computer++;
        computerScoreElem.textContent = scores.computer;
    } else {
        scores.tie++;
        tieScoreElem.textContent = scores.tie;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('played', 'x', 'o');
    });
    currentPlayer = 'X';
}

function toggleSound() {
    isSoundOn = !isSoundOn;
    soundBtn.textContent = `Sound: ${isSoundOn ? 'On' : 'Off'}`;
}

function playPlaceSound() {
    if (isSoundOn) {
        placeSound.currentTime = 0; // Reset sound to start
        placeSound.play();
    }
}

function playWinSound() {
    if (isSoundOn) {
        winSound.currentTime = 0; // Reset sound to start
        winSound.play();
    }
}

function playTieSound() {
    if (isSoundOn) {
        tieSound.currentTime = 0; // Reset sound to start
        tieSound.play();
    }
}

// Function to toggle the visibility of the Tik Tak Toe game
function toggleTikTakToe() {
    const tikTakToeContainer = document.getElementById('tikTakToeContainer');
    if (tikTakToeContainer.style.display === 'none' || tikTakToeContainer.style.display === '') {
        tikTakToeContainer.style.display = 'flex';
    } else {
        tikTakToeContainer.style.display = 'none';
    }
}

// Add event listener to the button with id 'tikTakButton'
document.getElementById('tikTakButton').addEventListener('click', toggleTikTakToe);
