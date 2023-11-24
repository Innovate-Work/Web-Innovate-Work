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
            link: "www.nike.com"
        },
        {
            name: "Web site online shop for Adidas",
            link: "www.nike.com"
        },
        {
            name: "Web site online shop for Puma",
            link: "www.nike.com"
        },
        {
            name: "Web site online shop for Reebok",
            link: "www.nike.com"
        }
    ],
    "Application": [
        {
            name: "Mobile App for Fitness",
            link: "www.nike.com"
        },
        {
            name: "Mobile App for Nutrition",
            link: "www.nike.com"
        },
        {
            name: "Mobile App for Meditation",
            link: "www.nike.com"
        },
        {
            name: "Mobile App for Running",
            link: "www.nike.com"
        }
    ]
};

function initPackages() {
    updatePackages("Website"); // Инициализация с первой вкладкой
}

// function updatePackages(tabName) {
//     const packages = document.querySelectorAll('.work-package');
//     const data = tabData[tabName] || [];

//     packages.forEach((packageElem, index) => {
//         packageElem.classList.remove('active-package');

//         if (data[index]) {
//             const nameExample = packageElem.querySelector('.name-example');
//             const linkExample = packageElem.querySelector('.link-example');

//             nameExample.textContent = data[index].name;
//             linkExample.textContent = data[index].link;

//             packageElem.style.display = ""; // Ensure the element is visible

//             // Delay adding the active class to create the slide effect
//             setTimeout(() => {
//                 packageElem.classList.add('active-package');
//             }, 150 * (index + 1));
//         } else {
//             packageElem.style.display = "none";
//         }
//     });
// }

function updatePackages(tabName) {
    const packages = document.querySelectorAll('.work-package');
    const data = tabData[tabName] || [];

    packages.forEach((packageElem, index) => {
        if (data[index]) {
            const nameExample = packageElem.querySelector('.name-example');
            const linkText = packageElem.querySelector('.link-example .link-text'); // Выбор элемента для текста ссылки

            nameExample.textContent = data[index].name;
            linkText.textContent = data[index].link; // Обновляем только текст ссылки

            packageElem.style.display = ""; // Ensure the element is visible

            // Delay adding the active class to create the slide effect
            setTimeout(() => {
                packageElem.classList.add('active-package');
            }, 150 * (index + 1));
        } else {
            packageElem.style.display = "none";
        }
    });
}



