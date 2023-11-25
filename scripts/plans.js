$(document).ready(function(){
    // Сделаем первый div активным при инициализации
    $('.tabs div:first-child').addClass('active-tab');

    $('.tabs div').click(function(){
        // Сначала удаляем класс 'active-tab' у всех div
        $('.tabs div').removeClass('active-tab');
        // Добавляем класс 'active-tab' к нажатому div
        $(this).addClass('active-tab');
    });
});

document.addEventListener('DOMContentLoaded', initPackages);

const tabData = {
    "Website": [
        {
            title: "Basic",
            features: ["Basic website development", "Pre-designed templates", "Limited customization", "Standard features", "Ideal for small businesses"],
            price: "$500"
        },
        {
            title: "Professional",
            features: ["Custom website development", "Tailored design", "Enhanced features", "Basic SEO optimization", "Suitable for growing businesses"],
            price: "$1000"
        },
        {
            title: "Business",
            features: ["Complex website development", "Highly customized solution", "Advanced features", "Comprehensive SEO", "Designed for large corporations"],
            price: "$5000"
        }
    ],
    "Application": [
        {
            title: "Basic",
            features: ["Basic mobile app for iOS/Android", "Pre-designed app templates", "Limited customization", "Standard features", "Ideal for individuals/small businesses"],
            price: "$5000"
        },
        {
            title: "Professional",
            features: ["Custom mobile app development", "User-friendly interface design", "Integration with backend services", "App testing and deployment", "Suitable for growing businesses"],
            price: "$10000"
        },
        {
            title: "Business",
            features: ["Complex app development", "Highly customized solution", "Advanced features", "Testing and optimization", "Designed for larger corporations and organizations"],
            price: "$15000"
        }
    ],
    "Application and Website": [
        {
            title: "WEB & APP solution",
            features: ["Custom website and mobile app development", "Tailored design to match brand identity", "Enhanced features for both web and app (e.g., user authentication, e-commerce)", "Comprehensive SEO, performance optimization, and app testing", "Suitable for businesses requiring both web and mobile presence"],
            price: "$5400"
        }
    ]
};

function initPackages() {
    const packages = document.querySelectorAll('.package');
    packages.forEach((packageElem, index) => {
        setTimeout(() => {
            packageElem.style.transform = "translateY(0)";
            packageElem.style.opacity = "1";
        }, 150 * (index + 1));
    });
}


function updatePackages(tabName) {
    const packages = document.querySelectorAll('.package');
    const data = tabData[tabName];

    // Устанавливаем начальные стили для анимации
    packages.forEach((packageElem, index) => {
        packageElem.style.transition = 'none'; // Отключаем анимацию для мгновенного применения стилей
        packageElem.style.transform = "translateY(50px)"; // Начинаем снизу
        packageElem.style.opacity = "0"; // Полностью прозрачный

        if (tabName === "Application and Website" && index > 0) {
            packageElem.style.display = "none";
        } else {
            packageElem.style.display = "block";
        }
    });

    if (tabName === "Application and Website") {
        packages[0].style.width = "707px";
        packages[0].style.height = "auto";
        packages[0].style.margin = "0 auto"; // Для центрирования
    } else {
        packages.forEach((packageElem) => {
            packageElem.style.width = "340px"; // Возвращаем первоначальные размеры
            packageElem.style.height = "auto";

            // Условие для вкладки "Application"
            if (tabName === "Application") {
                packageElem.style.height = "auto"; // Увеличиваем на 10px
            } else {
                packageElem.style.height = "auto"; // Оригинальная высота
            }

            packageElem.style.margin = "0"; // Убираем стили центрирования
        });
    }

    packages.forEach((packageElem, index) => {
        if (data[index]) {
            const title = packageElem.querySelector('h2');
            const featureList = packageElem.querySelector('ul');
            const price = packageElem.querySelector('.price');

            // Очистка текущего списка функций
            while (featureList.firstChild) {
                featureList.removeChild(featureList.firstChild);
            }

            // Добавление новых функций
            data[index].features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featureList.appendChild(li);
            });

            title.textContent = data[index].title;
            const priceSpan = price.querySelector('span');
            const priceValue = document.createTextNode(data[index].price);
            if (priceSpan.nextSibling) {
                price.replaceChild(priceValue, priceSpan.nextSibling);
            } else {
                price.appendChild(priceValue);
            }

            // Включаем анимацию и применяем конечные стили
            setTimeout(() => {
                packageElem.style.transition = ''; // Включаем анимацию
                packageElem.style.transform = "translateY(0)"; // Перемещаем в исходное положение
                packageElem.style.opacity = "1"; // Делаем видимым
            }, 150 * (index + 1));
        }
    });
}

document.querySelectorAll('.tabs div').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabName = e.target.textContent.trim();
        const packages = document.querySelectorAll('.package');
        packages.forEach(p => p.classList.remove('selected'));
        updatePackages(tabName);

        // Сброс класса 'active-tab' для всех вкладок и установка его для текущей вкладки
        document.querySelectorAll('.tabs div').forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('scrollTo') && urlParams.get('scrollTo') === 'tabs') {
        const element = document.querySelector('.tabs');
        if (element) {
            setTimeout(function() { // задержка, чтобы дать странице полностью загрузиться
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});


// pop up action
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalText = modal.querySelector('.modal-text');
    const packageNameSpan = modalText.querySelector('.package-name');
    const packageFeatures = modalText.querySelector('ul');
    const customInterfaceButton = document.querySelector('.service-button:nth-child(1)');
    const maintenanceButton = document.querySelector('.service-button:nth-child(2)');

    document.querySelectorAll('.package .button-view').forEach(button => {
        button.addEventListener('click', function(event) {
            const packageElem = event.target.closest('.package');
            const packageName = packageElem.querySelector('h2').innerText;
            // Clear existing features
            while (packageFeatures.firstChild) {
                packageFeatures.removeChild(packageFeatures.firstChild);
            }
            packageNameSpan.innerText = packageName.toUpperCase();
            const features = packageElem.querySelectorAll('ul li');
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.textContent;
                packageFeatures.appendChild(li);
            });
            modal.style.display = 'block';

            // Проверка ширины экрана и прокрутка к модальному блоку на мобильных устройствах
            if (window.innerWidth <= 576) {
                const modalTop = modal.getBoundingClientRect().top + window.scrollY - 110; // Получаем позицию модального окна относительно верхнего края документа и вычитаем 60px
                window.scrollTo({ top: modalTop, behavior: 'smooth' }); // Плавная прокрутка к вычисленной позиции
            }
        });
    });


    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        customInterfaceButton.setAttribute('data-active', 'false');
        maintenanceButton.setAttribute('data-active', 'false');
        customInterfaceButton.classList.remove('active-button-class');
        maintenanceButton.classList.remove('active-button-class');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.service-button');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var isActive = this.getAttribute('data-active') === 'true';
            this.setAttribute('data-active', !isActive);
        });
    });
});

// Функция для закрытия подсказки
function closeHint() {
    hintText.style.display = 'none';
  }
  
  // Обработчик клика для иконки
  serviceIcon.addEventListener('click', function(event) {
    // Переключаем отображение текста подсказки
    var isDisplayed = hintText.style.display === 'block';
    closeHint();
    if (!isDisplayed) {
      hintText.style.display = 'block';
      event.stopPropagation(); // Останавливаем всплытие, чтобы не срабатывало закрытие подсказки
    }
  });
  
  // Обработчик клика для всего документа
  document.addEventListener('click', closeHint);


const form = document.getElementById('validation-form');
const inputs = form.querySelectorAll('input');

function showInputError(input) {
    const errorDiv = document.getElementById(input.id + '-error');
    if (input.validity.valueMissing) {
        errorDiv.textContent = 'This field is required.';
        errorDiv.style.display = 'block';
    } else if (input.validity.patternMismatch) {
        if (input.type === "email") {
            errorDiv.textContent = 'Please enter a valid email.';
        } else if (input.type === "tel") {
            errorDiv.textContent = 'Please enter a valid phone number.';
        }
        errorDiv.style.display = 'block';
    } else {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function validateForm(e) {
    e.preventDefault();

    let valid = true;
    let errorMessage = "";

    inputs.forEach(input => {
        if (!input.validity.valid) {
            valid = false;
            if (input.validity.valueMissing) {
                errorMessage += `Field ${input.placeholder} is required.\n`;
            } else if (input.validity.patternMismatch) {
                if (input.type === "email") {
                    errorMessage += 'Please enter a valid email.\n';
                } else if (input.type === "tel") {
                    errorMessage += 'Please enter a valid phone number.\n';
                }
            }
            showInputError(input);
        } else {
            document.getElementById(input.id + '-error').style.display = 'none';
        }
    });

    if (!valid) {
        alert(errorMessage);
    } else {
        form.submit();
    }
}

form.addEventListener('submit', validateForm);

// for table swith

var dataForWebsite = [
    ['Basic', '$500'],
    ['Pro', '$1000'],
    ['Business', '$5000'],
    ['Basic website development', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Pre-designed Template', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>'],
    ['Limited customization', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>'],
    ['Standard feature (e.g. about us)', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Tailored Design to match brand identity', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Enhance Featuring (e.g contact form, blog)', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Best SEO Optimization', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Complex Website Development', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Highly customized solution', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Advanced Feature (user customization, ecommerce)', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Comprehensive SEO & performance optimization', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-horizontal-rule">--</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>']
  ];

  var dataForApplication = [
    ['Basic', '$5000'],
    ['Pro', '$10000'],
    ['Business', '$50000'],
    ['Basic mobile app development', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Pre-designed app templates', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Limited customization', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Standard app features', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Custom mobile app development', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['User-friendly interface design', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Integration with backend services', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['App testing and deployment', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Complex mobile app development', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Highly customized app solutions', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Advanced features (e.g., user authentication, payment processing)', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>'],
    ['Comprehensive app testing and optimization', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>', '<i class="fa-solid fa-check" style="color: #c5ff68"></i>']
  ];
  

  function updateTable(dataArray) {
    var table = document.querySelector('.feature-service-table tbody');

    var headerDivs = document.querySelectorAll('.feature-service-table .head-div');
    headerDivs.forEach((div, index) => {
      // Убедитесь, что есть соответствующие данные перед попыткой обновления
      if (dataArray[index]) {
        var pricePara = div.querySelector('p');
        pricePara.innerHTML = `<span>from</span> ${dataArray[index][1]}`;
      }
    });
  
    // Очищаем текущее содержимое таблицы
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  
    dataArray.forEach(function (rowItems, rowIndex) {
        // Пропускаем строки, которые предназначены для заголовков
        if (rowIndex < headerDivs.length) return;
    
        var row = table.insertRow();
        rowItems.forEach(function (item) {
          var cell = row.insertCell();
          cell.innerHTML = item;
        });
      });
    }

  document.addEventListener('DOMContentLoaded', function() {
    // Заполнение таблицы по умолчанию данными для "Website"
    updateTable(dataForWebsite);
  
    // Получаем все вкладки и добавляем к ним обработчики событий
    var tabs = document.querySelectorAll('#tabs div');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Получаем текст внутри вкладки
        var tabText = tab.textContent.trim();
  
        // Выбираем данные на основе текста вкладки
        if (tabText === "Website") {
          updateTable(dataForWebsite);
        } else if (tabText === "Application") {
          updateTable(dataForApplication);
        } else if (tabText === "Application and Website") {
          // Здесь должен быть код для обновления таблицы данными "Application and Website"
          // updateTable(dataForBoth);
        }
  
        // Сброс и установка активного класса для вкладок
        tabs.forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
      });
    });
  });
  

  // submit pop up close

  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const submitButton = document.querySelector('.submit-button-pop-up');
    const openButtons = document.querySelectorAll('.button-view'); // Кнопки для открытия модального окна

    // Функция для открытия модального окна
    function openModal() {
        if (window.innerWidth <= 768) {
            modal.style.display = 'block';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }
    }

    // Функция для закрытия модального окна
    function closeModal() {
        if (window.innerWidth <= 768) {
            modal.style.transition = 'transform 0.5s, opacity 0.5s';
            modal.style.transform = 'scale(0)';
            modal.style.opacity = '0';

            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    }

    // Обработчик событий для открытия модального окна
    openButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    // Обработчик события для кнопки submit
    submitButton.addEventListener('click', closeModal);
});

