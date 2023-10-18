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
            features: ["Basic website development", "Pre-designed templates", "Limited customization", "Standard features", "Ideal for small businesses"],
            price: "$5000"
        },
        {
            title: "Professional",
            features: ["Custom website development", "Tailored design", "Enhanced features", "Basic SEO optimization", "Suitable for growing businesses"],
            price: "$10000"
        },
        {
            title: "Business",
            features: ["Complex website development", "Highly customized solution", "Advanced features", "Comprehensive SEO", "Designed for large corporations"],
            price: "$15000"
        }
    ],
    "Application and Website": [
        {
            title: "Basic",
            features: ["Basic website development", "Pre-designed templates", "Limited customization", "Standard features", "Ideal for small businesses"],
            price: "$5400"
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
    ]
};

function updatePackages(tabName) {
    const packages = document.querySelectorAll('.package');
    const data = tabData[tabName];

    packages.forEach((packageElem, index) => {
        const title = packageElem.querySelector('h2');
        const featureList = packageElem.querySelector('ul');
        const price = packageElem.querySelector('.price');

        // Анимация
        packageElem.style.transform = "scale(0.8)";
        packageElem.style.opacity = "0";
        setTimeout(() => {
            packageElem.style.transition = "transform 0.5s, opacity 0.5s";
            packageElem.style.transform = "scale(1)";
            packageElem.style.opacity = "1";
        }, 100);

        title.textContent = data[index].title;
        price.textContent = `from ${data[index].price}`;

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
    });
}

document.querySelectorAll('.tabs div').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabName = e.target.textContent.trim();
        updatePackages(tabName);

        // Сброс класса 'active-tab' для всех вкладок и установка его для текущей вкладки
        document.querySelectorAll('.tabs div').forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
    });
});


