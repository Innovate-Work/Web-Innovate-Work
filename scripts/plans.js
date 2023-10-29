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
            title: "Integrated WEB & APP solution",
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
        packages[0].style.height = "435px";
        packages[0].style.margin = "0 auto"; // Для центрирования
    } else {
        packages.forEach((packageElem) => {
            packageElem.style.width = "340px"; // Возвращаем первоначальные размеры
            packageElem.style.height = "410px";

            // Условие для вкладки "Application"
            if (tabName === "Application") {
                packageElem.style.height = "430px"; // Увеличиваем на 10px
            } else {
                packageElem.style.height = "410px"; // Оригинальная высота
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

