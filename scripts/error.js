
const button = document.querySelector('.button');
const targetDiv = document.querySelector('.page-container');

button.addEventListener('click', function() {
    this.classList.add('pressed'); // добавляем класс для анимации

    // Ждём 0,5 секунды после анимации кнопки и начинаем скролл к div
    setTimeout(() => {
        targetDiv.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Ждём окончания скролла и возвращаем кнопку в исходное состояние
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 1000); // предположим, что скролл займет 1 секунду, но это значение можно корректировать
    }, 500); // 0,5 секунды ожидания после анимации
});


// Функция обратного вызова для первого наблюдателя
function handleIntersectionFirst(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.first-line').classList.add('animate-first');
            entry.target.querySelector('.second-line').classList.add('animate-second');
            observer.unobserve(entry.target); // Прекратить наблюдение
        }
    });
}

// Функция обратного вызова для второго наблюдателя
function handleIntersectionSecond(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Прекратить наблюдение за этим элементом, так как анимация уже произошла
        }
    });
}

// Настройки для наблюдателей
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Создаем первый наблюдатель для контейнера
const observerForContainer = new IntersectionObserver(handleIntersectionFirst, observerOptions);
const container = document.querySelector('.container-animation-text');
observerForContainer.observe(container);

// Создаем второй наблюдатель для ячеек
const observerForCells = new IntersectionObserver(handleIntersectionSecond, observerOptions);
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    observerForCells.observe(cell);
});




document.getElementById('validation-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let hasError = false;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    if (!name.value) {
        name.nextElementSibling.textContent = 'Name is required.';
        hasError = true;
    } else {
        name.nextElementSibling.textContent = '';
    }

    if (!email.validity.valid) {
        email.nextElementSibling.textContent = 'Please enter a valid email.';
        hasError = true;
    } else {
        email.nextElementSibling.textContent = '';
    }

    if (!phone.validity.valid) {
        phone.nextElementSibling.textContent = 'Please enter a valid phone number.';
        hasError = true;
    } else {
        phone.nextElementSibling.textContent = '';
    }
});

document.querySelectorAll('.cell').forEach(function(cell) {
    cell.addEventListener('click', function() {
        window.location.href = 'plans.html?scrollTo=tabs';
    });
});



function showError() {
    document.querySelector('.overlay').style.display = 'flex'; // Show the overlay and error box
}

function hideError() {
    document.querySelector('.overlay').style.display = 'none'; // Hide the overlay and error box
}


// Call showError() to display the error box and overlay
// Call hideError() to hide them


