$(document).ready(function(){
    // Сделаем первый div активным при инициализации
    $('.tabs div:first-child').addClass('active-tab');

    $('.tabs div').click(function(){
        // Сначала удаляем класс 'active-tab' у всех div
        $('.tabs div').removeClass('active-tab');
        // Добавляем класс 'active-tab' к нажатому div
        $(this).addClass('active-tab');
        updatePackages($(this).text().trim()); // Обновляем пакеты при клике
    });
});

document.addEventListener('DOMContentLoaded', initPackages);

const tabData = {
    "Website": [
        {
            name: "Web site online shop for Nike",
            link: "www.example"
        },
        {
            name: "Web site online shop for Adidas",
            link: "www.example"
        },
        {
            name: "Web site online shop for Puma",
            link: "www.example"
        },
        {
            name: "Web site online shop for Reebok",
            link: "www.example"
        }
    ],
    "Application": [
        {
            name: "Mobile App for Fitness",
            link: "www.example"
        },
        {
            name: "Mobile App for Nutrition",
            link: "www.example"
        },
        {
            name: "Mobile App for Meditation",
            link: "www.example"
        },
        {
            name: "Mobile App for Running",
            link: "www.example"
        }
    ]
};

function initPackages() {
    updatePackages("Website"); // Инициализация с первой вкладкой
}

function updatePackages(tabName) {
    const packages = document.querySelectorAll('.work-package');
    const data = tabData[tabName] || [];

    // Устанавливаем начальные стили для анимации
    packages.forEach((packageElem, index) => {
        packageElem.style.transform = "translateY(-50px)";
        packageElem.style.opacity = "0";
    });

    packages.forEach((packageElem, index) => {
        if (data[index]) {
            const nameExample = packageElem.querySelector('.name-example');
            const linkExample = packageElem.querySelector('.link-example');

            nameExample.textContent = data[index].name;
            linkExample.textContent = data[index].link;

            setTimeout(() => {
                packageElem.style.transform = "translateY(0)";
                packageElem.style.opacity = "1";
            }, 150 * (index + 1));
        } else {
            packageElem.style.display = "none"; // Скрываем лишние элементы
        }
    });
}

