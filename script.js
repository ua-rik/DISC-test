// Масив з питаннями та якостями
const questions = [
    {
        qualities: ["Лідерський", "Аналітичний", "Дружній", "Організований"]
    },
    {
        qualities: ["Рішучий", "Творчий", "Терплячий", "Пунктуальний"]
    },
    {
        qualities: ["Активний", "Відкритий", "Спокійний", "Дисциплінований"]
    },
    {
        qualities: ["Цілеспрямований", "Емоційний", "Доброзичливий", "Педантичний"]
    },
    {
        qualities: ["Енергійний", "Оптимістичний", "Врівноважений", "Сумлінний"]
    },
    {
        qualities: ["Амбіційний", "Комунікабельний", "Лояльний", "Акуратний"]
    },
    {
        qualities: ["Вольовий", "Веселий", "Слухняний", "Методичний"]
    },
    {
        qualities: ["Наполегливий", "Інтуїтивний", "Співчутливий", "Практичний"]
    },
    {
        qualities: ["Впевнений", "Впливовий", "Стабільний", "Систематичний"]
    },
    {
        qualities: ["Рішучий", "Виразний", "Тихий", "Уважний до деталей"]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let userName = "";

// Функція для початку тесту
function startTest() {
    userName = document.getElementById('userName').value.trim();
    if (userName === "") {
        alert("Будь ласка, введіть своє ім'я.");
        return;
    }
    document.getElementById('nameInput').classList.add('d-none');
    document.getElementById('questionSection').classList.remove('d-none');
    loadQuestion();
}

// Функція для завантаження питання
function loadQuestion() {
    document.getElementById('currentQuestion').innerText = currentQuestionIndex + 1;

    const qualities = questions[currentQuestionIndex].qualities;

    // Очищення попередніх опцій
    document.getElementById('mostOptions').innerHTML = '';
    document.getElementById('leastOptions').innerHTML = '';

    // Генерація кнопок для "найбільш притаманне"
    qualities.forEach((quality, index) => {
        let label = document.createElement('label');
        label.className = 'btn btn-outline-primary m-1 flex-fill';
        label.innerHTML = `<input type="radio" name="most" value="${index}"> ${quality}`;
        document.getElementById('mostOptions').appendChild(label);
    });

    // Генерація кнопок для "найменш притаманне"
    qualities.forEach((quality, index) => {
        let label = document.createElement('label');
        label.className = 'btn btn-outline-secondary m-1 flex-fill';
        label.innerHTML = `<input type="radio" name="least" value="${index}"> ${quality}`;
        document.getElementById('leastOptions').appendChild(label);
    });
}

// Функція для переходу до наступного питання
function nextQuestion() {
    const most = document.querySelector('input[name="most"]:checked');
    const least = document.querySelector('input[name="least"]:checked');

    if (!most || !least) {
        alert("Будь ласка, виберіть опції для обох питань.");
        return;
    }

    if (most.value === least.value) {
        alert("Ви не можете вибрати одну і ту ж якість для обох питань.");
        return;
    }

    userAnswers.push({
        most: most.value,
        least: least.value
    });

    // Скидання вибору для наступного питання
    document.querySelectorAll('input[name="most"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="least"]').forEach(el => el.checked = false);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        finishTest();
    }
}

// Функція для завершення тесту
function finishTest() {
    document.getElementById('questionSection').classList.add('d-none');
    document.getElementById('thankYou').classList.remove('d-none');

    // Підготовка даних для відправки
    const data = {
        name: userName,
        answers: userAnswers
    };

    // Відправка даних до Google Таблиці через API-запит
    fetch('YOUR_GOOGLE_SHEETS_API_URL', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        console.log('Дані успішно відправлено');
    }).catch(error => {
        console.error('Помилка при відправці даних:', error);
    });
}
