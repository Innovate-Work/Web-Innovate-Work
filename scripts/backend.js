document.getElementById('validation-form').addEventListener('submit', function(event){
    event.preventDefault(); // предотвращаем обычную отправку формы

    // Собираем данные из формы
    let name = document.getElementById('name-pop-up').value;
    let email = document.getElementById('email-pop-up').value;
    let phone = document.getElementById('phone-pop-up').value;
    let customInterfaceButton = document.querySelector('.custom-interface-design');
    let maintenanceButton = document.querySelector('.maintenance');
    let isCustom = customInterfaceButton ? customInterfaceButton.getAttribute('data-active') === 'true' : false;
    let withSubscription = maintenanceButton ? maintenanceButton.getAttribute('data-active') === 'true' : false;

    // Создаем объект данных
    let data = {
        name: name,
        email: email,
        phone: phone,
        withSubscription: withSubscription,
        isCustom: isCustom
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

