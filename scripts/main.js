
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
            // entry.target.querySelector('.second-line').classList.add('animate-second');
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




$(document).ready(function() {
    // Обработчик клика для каждого text-container
    $('.cell .text-container').each(function(index) {
        $(this).click(function() {
            var tabName;
            switch (index) {
                case 0:
                    tabName = 'Website';
                    break;
                case 1:
                    tabName = 'Application';
                    break;
                case 2:
                    tabName = 'Application and Website';
                    break;
                // Добавьте дополнительные случаи здесь, если нужно
            }
            // Перенаправление на страницу plans.html с параметром tab
            window.location.href = 'plans.html?tab=' + encodeURIComponent(tabName);
        });
    });
});


 // animation for text
 document.addEventListener("scroll", function() {
    var headline = document.querySelector(".headline");
    var headlinePosition = headline.getBoundingClientRect().left;
    var screenPosition = window.innerWidth / 1.3;

    if (headlinePosition < screenPosition) {
        headline.classList.add("visible");
    }
});


function typeWriter(element, text, i, interval) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        setTimeout(function() {
            typeWriter(element, text, i + 1, interval);
        }, interval);
    }
}

document.addEventListener("scroll", function() {
    var title = document.querySelector('.form-title');
    var titlePosition = title.getBoundingClientRect().top;
    var screenPosition = window.innerHeight;

    if (titlePosition < screenPosition) {
        // Удаляем обработчик событий, чтобы анимация не повторялась при каждой прокрутке
        document.removeEventListener("scroll", arguments.callee);
        // Запускаем эффект печатания
        typeWriter(title, title.textContent, 0, 100); // 100 - скорость печатания в миллисекундах
    }
});

document.addEventListener("scroll", function() {
    var message = document.querySelector('.contact-message');
    var messagePosition = message.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3; // Вы можете настроить это значение

    if (messagePosition < screenPosition) {
        // Удаляем обработчик событий, чтобы анимация не повторялась при каждой прокрутке
        document.removeEventListener("scroll", arguments.callee);
        // Добавляем класс 'visible', чтобы начать анимацию
        message.classList.add("visible");
    }
});


document.getElementById('validation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    // Создаем объект данных
    let data = {
        name: name,
        email: email,
        phone: phone,
        withSubscription: false,
        isCustom: false
    };
    console.log('Data object:', data);
    console.log('JSON representation:', JSON.stringify(data));
    // Отправляем запрос
    fetch('https://api.innovatework.net/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
    .then(data => {
        showSeccsessPopup(); 
    })
    .catch(errorResponse => {
        // Проверяем, является ли errorResponse объектом Response
        if (errorResponse instanceof Response) {
            // Пытаемся прочитать тело ответа как JSON
            errorResponse.json().then(errorData => {
                let errorCode = errorResponse.status; // Уже известно, что status существует, так как errorResponse - объект Response
                let errorMessage = errorData.Message || 'An unknown error occurred';
                showPopup(errorMessage, errorCode);
            }).catch(() => {
                // Если тело ответа не в формате JSON, просто выводим статус ответа
                showPopup('An error occurred', errorResponse.status);
            });
        } else {
            // Если errorResponse - не объект Response, обрабатываем как неизвестную ошибку
            // console.error('Unexpected error:', errorResponse);
            showPopup('An unexpected error occurred', 'Unknown');
        }
    });
});

function showPopup(message, errorCode = null) {
    const errorBox = document.querySelector('.error-box'); // Убедитесь, что этот класс соответствует вашему pop-up
    const httpError = errorBox.querySelector('.HTTP-error span');
    const httpDescription = errorBox.querySelector('.HTTP-description');
    const overlay = document.querySelector('.overlay');

    // Если передан код ошибки, устанавливаем его, иначе показываем общее сообщение
    if (errorCode) {
        httpError.textContent = `HTTP Error ${errorCode}:`;
    }
    httpDescription.textContent = message;

    // Показываем pop-up
    errorBox.style.display = 'flex';
    overlay.style.display = 'block'; 
}


document.querySelector('.reload-button').addEventListener('click', function() {
    const errorBox = document.querySelector('.error-box');
    const overlay = document.querySelector('.overlay');
    if (errorBox) {
        errorBox.style.display = 'none'; // Скрываем pop-up
        overlay.style.display = 'none'; // Скрываем фон
    }
});



function showSeccsessPopup() {
    const seccsessBox = document.querySelector('.seccsess-box'); 
    const overlay = document.querySelector('.overlay');
    seccsessBox.style.display = 'flex'; // Или 'block', если не используете Flexbox
    overlay.style.display = 'block'; // Показываем фон
}

// Обработчик клика для кнопки перезагрузки на pop-up
document.querySelector('.close-button').addEventListener('click', function() {
    const seccsessBox = document.querySelector('.seccsess-box');
    const overlay = document.querySelector('.overlay');
    if (seccsessBox) {
        seccsessBox.style.display = 'none'; // Скрываем pop-up
        overlay.style.display = 'none'; // Скрываем фон
    }
});