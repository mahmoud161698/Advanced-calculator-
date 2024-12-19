// Global Variables
let birthdate;
let birthtime;
let intervalId;
let countdownInterval;

// Zodiac Signs Data
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

// Function to Load Sections
function loadSection(section) {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('ageSection').classList.add('hidden');
    document.getElementById('zodiacSection').classList.add('hidden');
    document.getElementById('loveSection').classList.add('hidden');
    document.getElementById('tictactoeSection').classList.add('hidden');
    document.getElementById('decisionWheelSection').classList.add('hidden');
    
    const sectionElement = document.getElementById(section + 'Section');
    sectionElement.classList.remove('hidden');
    setTimeout(() => {
        sectionElement.classList.add('show');
    }, 10); // Small delay to ensure the animation is applied correctly
}

// Function to Go Back to Main Page
function goBack() {
    document.getElementById('mainPage').classList.remove('hidden');
    document.getElementById('ageSection').classList.remove('show');
    document.getElementById('zodiacSection').classList.remove('show');
    document.getElementById('loveSection').classList.remove('show');
    document.getElementById('tictactoeSection').classList.remove('show');
    document.getElementById('decisionWheelSection').classList.remove('show');
    
    setTimeout(() => {
        document.getElementById('mainPage').classList.add('show');
        document.getElementById('ageSection').classList.add('hidden');
        document.getElementById('zodiacSection').classList.add('hidden');
        document.getElementById('loveSection').classList.add('hidden');
        document.getElementById('tictactoeSection').classList.add('hidden');
        document.getElementById('decisionWheelSection').classList.add('hidden');
    }, 10); // Small delay to ensure the animation is applied correctly
}

// Function to Calculate Age
function calculateAge() {
    const birthdateString = document.getElementById('birthdate').value;
    const birthtimeString = document.getElementById('birthtime').value;
    if (!birthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }
    if (!birthtimeString) {
        alert('يرجى إدخال ساعة الميلاد.');
        return;
    }

    birthdate = new Date(birthdateString + 'T' + birthtimeString);
    const today = new Date();

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

// Function to Update Result Table
function updateResultTable(tableId, key, value) {
    const table = document.getElementById(tableId);
    table.style.display = 'table';
    
    const existingRow = Array.from(table.rows).find(row => row.cells[0].textContent === key);
    
    if (existingRow) {
        existingRow.cells[1].textContent = value;
    } else {
        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.textContent = key;
        cell2.textContent = value;
    }
}

// Function to Update Age
function updateAge() {
    const today = new Date();
    const ageMilliseconds = today - birthdate;
    
    // Calculate years, months, and days accurately
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    // Correct calculations if the current day is before the birth day in the current month
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // Correct calculations if the current month is before the birth month
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate weeks and remaining days
    const totalDays = Math.floor(ageMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Calculate hours, minutes, and seconds
    let hours = today.getHours() - birthdate.getHours();
    let minutes = today.getMinutes() - birthdate.getMinutes();
    let seconds = today.getSeconds() - birthdate.getSeconds();

    // Correct calculations for hours, minutes, and seconds
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

    // Update the result table
    updateResultTable('ageResultTable', 'عمرك', `${years} سنة و ${months} أشهر و ${days} أيام و ${hours} ساعات و ${minutes} دقائق و ${seconds} ثواني`);
    updateResultTable('ageResultTable', 'العمر بالأشهر', `${years * 12 + months} أشهر و ${days} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأسابيع', `${weeks} أسابيع و ${remainingDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالأيام', `${totalDays} أيام`);
    updateResultTable('ageResultTable', 'العمر بالساعات', `${Math.floor(ageMilliseconds / (1000 * 60 * 60))} ساعات`);
    updateResultTable('ageResultTable', 'العمر بالدقائق', `${Math.floor(ageMilliseconds / (1000 * 60))} دقائق`);
    updateResultTable('ageResultTable', 'العمر بالثواني', `${Math.floor(ageMilliseconds / 1000)} ثواني`);
}

// Function to Calculate Next Birthday
function calculateNextBirthday() {
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeDifference = nextBirthday - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateResultTable('ageResultTable', 'عيد ميلادك القادم', 'عيد ميلادك اليوم!');
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        updateResultTable('ageResultTable', 'عيد ميلادك القادم', `${days} يوم, ${hours} ساعة, ${minutes} دقيقة, ${seconds} ثانية`);
    }, 1000);
}

// Function to Calculate Zodiac
function calculateZodiac() {
    const zodiacBirthdateString = document.getElementById('zodiacBirthdate').value;
    if (!zodiacBirthdateString) {
        alert('يرجى إدخال تاريخ الميلاد.');
        return;
    }

    const zodiacBirthdate = new Date(zodiacBirthdateString);
    findZodiacSign(zodiacBirthdate);
}

// Function to Find Zodiac Sign
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

// Function to Randomize Birth Time
function randomizeBirthTime() {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const birthtime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
    document.getElementById('birthtime').value = birthtime;
}

// Function to Contact Developer
function contactDeveloper() {
    window.location.href = 'https://wa.me/2001104865607';
}

// Function to Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.querySelector('.toggle-dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';
    } else {
        toggleButton.textContent = '☀️';
    }
}

// Function to Get Custom Advice
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

// Function to Calculate Love Percentage
function calculateLove() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    
    if (name1 && name2) {
        const lovePercentage = Math.floor(Math.random() * 101);
        let message = getLoveMessage(lovePercentage);
        document.getElementById('result').innerHTML = `نسبة الحب بين ${name1} و ${name2} هي: ${lovePercentage}%<br>${message}`;
        document.getElementById('shareButtons').style.display = 'block';
        playSound('resultSound');
    } else {
        alert("الرجاء إدخال الاسمين!");
    }
}

// Function to Get Love Message
function getLoveMessage(percentage) {
    if (percentage < 50) {
        return "غير يسطا العلاقه دي مش نافعة 😂";
    } else if (percentage < 80) {
        return "العب يا برعي يا خاربها 😂";
    } else {
        return "اوبا! يا مقطع السمكة وديلها 😂";
    }
}

// Function to Share on Social Media
function share(platform) {
    const result = document.getElementById('result').innerText;
    let url = '';
    if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(result)}`;
    } else if (platform === 'twitter') {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}&url=${encodeURIComponent(window.location.href)}`;
    }
    window.open(url, '_blank');
}

// Function to Play Sound
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// Welcome Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('welcomeScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('mainPage').classList.remove('hidden');
            document.getElementById('mainPage').classList.add('show');
        }, 1000);
    }, 3000);
});

// Tic-Tac-Toe Game Logic
let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let gameMode = 'player';
let difficulty = 'easy';
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  // صفوف
    [0,3,6], [1,4,7], [2,5,8],  // أعمدة
    [0,4,8], [2,4,6]  // قطريات
];

function initGame() {
    const gameBoard = document.getElementById('board');
    gameBoard.innerHTML = '';
    board = ['','','','','','','','',''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('status').textContent = 'دور اللاعب X';
    
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function setGameMode(mode) {
    gameMode = mode;
    initGame();
}

function setDifficulty(level) {
    difficulty = level;
    initGame();
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    
    if(!gameActive || board[index] !== '') return;
    
    makeMove(index, currentPlayer);
    
    if(gameMode === 'computer' && gameActive) {
        setTimeout(computerTurn, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    document.querySelector(`[data-index="${index}"]`).textContent = player;
    
    if(checkWinner(player)) {
        document.getElementById('status').textContent = `${player} فاز!`;
        gameActive = false;
        setTimeout(initGame, 2000);
    } else if(board.every(cell => cell !== '')) {
        document.getElementById('status').textContent = 'تعادل!';
        gameActive = false;
        setTimeout(initGame, 2000);
    } else {
        currentPlayer = player === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `دور اللاعب ${currentPlayer}`;
    }
}

function checkWinner(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function computerTurn() {
    if(!gameActive) return;

    let moveIndex;
    switch(difficulty) {
        case 'easy':
            moveIndex = randomMove();
            break;
        case 'medium':
            moveIndex = mediumMove();
            break;
        case 'hard':
            moveIndex = hardMove();
            break;
    }

    if(moveIndex !== undefined) {
        makeMove(moveIndex, 'O');
    }
}

function randomMove() {
    const emptyCells = board.reduce((acc, val, idx) => 
        val === '' ? [...acc, idx] : acc, []);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function mediumMove() {
    // محاولة منع الفوز أو إكمال صف
    for(let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if(board[a] === board[b] && board[a] !== '' && board[c] === '') 
            return c;
        if(board[a] === board[c] && board[a] !== '' && board[b] === '') 
            return b;
        if(board[b] === board[c] && board[b] !== '' && board[a] === '') 
            return a;
    }
    return randomMove();
}

function hardMove() {
    let bestScore = -Infinity;
    let moveIndex;

    for(let i = 0; i < board.length; i++) {
        if(board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            
            if(score > bestScore) {
                bestScore = score;
                moveIndex = i;
            }
        }
    }

    return moveIndex;
}

function minimax(board, depth, isMaximizing) {
    const scores = { 'O': 10, 'X': -10, 'draw': 0 };
    
    let result = checkGameState();
    if (result !== null) {
        return scores[result];
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

function checkGameState() {
    for (let player of ['X', 'O']) {
        if (winPatterns.some(pattern => 
            pattern.every(index => board[index] === player))) {
            return player;
        }
    }
    
    if (board.every(cell => cell !== '')) {
        return 'draw';
    }
    
    return null;
}

// بدء اللعبة
initGame();

// Decision Wheel Game Logic
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const resultDiv = document.getElementById('result');
const ctx = wheel.getContext('2d');

wheel.width = 400;
wheel.height = 400;

const sections = [
    { label: 'حقيقة', color: '#FF6384' },
    { label: 'تحدي', color: '#36A2EB' },
    { label: 'تبديل', color: '#FFCE56' },
    { label: 'إعادة المحاولة', color: '#4BC0C0' }
];

let currentRotation = 0;

function drawWheel() {
    const centerX = wheel.width / 2;
    const centerY = wheel.height / 2;
    const radius = wheel.width / 2;
    const sectionAngle = (Math.PI * 2) / sections.length;

    ctx.clearRect(0, 0, wheel.width, wheel.height);

    sections.forEach((section, index) => {
        const startAngle = index * sectionAngle;
        const endAngle = (index + 1) * sectionAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = section.color;
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sectionAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(section.label, radius - 30, 10);
        ctx.restore();
    });
}

function spin() {
    spinBtn.disabled = true;

    const fullRotations = Math.floor(Math.random() * 3) + 3;
    const randomAngle = Math.floor(Math.random() * 360);

    currentRotation += (fullRotations * 360) + randomAngle;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // إخفاء الرسالة قبل الدوران
    resultDiv.style.display = 'none';

    // تحديث الرسالة بعد انتهاء الدوران
    setTimeout(() => {
        const totalSections = sections.length;
        const degreesPerSection = 360 / totalSections;

        const normalizedRotation = currentRotation % 360;
        const sectionIndex = Math.floor((360 - normalizedRotation) / degreesPerSection);

        const selectedSection = sections[sectionIndex];

        const sectionMessages = {
            'حقيقة': 'سمعنا الفضايح 😂🤫',
            'تحدي': 'No risk no fun 😂😈',
            'تبديل': 'يا نحس دورك راح عليك 😅',
            'إعادة المحاولة': 'لف تاني بقا 😅'
        };

        const message = sectionMessages[selectedSection.label];

        // إظهار الرسالة وتحديثها
        resultDiv.textContent = message;
        resultDiv.style.display = 'block'; // تأكيد ظهور الرسالة

        spinBtn.disabled = false;
    }, 5000); // 5 ثوانٍ للدوران
}

drawWheel();
spinBtn.addEventListener('click', spin);
