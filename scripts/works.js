// $(document).ready(function(){
//     // Сделаем первый div активным при инициализации
//     $('.tabs div:first-child').addClass('active-tab');

//     $('.tabs div').click(function(){
//         // Сначала удаляем класс 'active-tab' у всех div
//         $('.tabs div').removeClass('active-tab');
//         // Добавляем класс 'active-tab' к нажатому div
//         $(this).addClass('active-tab');
//         updatePackages($(this).text().trim()); // Обновляем пакеты при клике
//     });

//     function checkUrlAndScroll() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const tab = urlParams.get('tab');
//         console.log("URL tab parameter:", tab);

//         if (tab) {
//             const tabElement = $('.tabs div').filter(function() {
//                 return $(this).text().trim() === tab;
//             });

//             if (tabElement.length) {
//                 $('.tabs div').removeClass('active-tab');
//                 tabElement.addClass('active-tab');
//                 updatePackages(tab); // Обновляем пакеты

//                 $('html, body').animate({
//                     scrollTop: $('.tabs').offset().top - 100
//                 }, 1000);
//             }
//         }
//     }

//     function updateGallery(tabName, packageElem, packageData) {
//         var galleryDiv = packageElem.querySelector('.content-works'); // Получить элемент, где будут отображаться изображения
//         galleryDiv.innerHTML = ''; // Очистить содержимое галереи

//         // Предположим, что у вас есть объект с массивами изображений для каждого пакета
//         var packageImages = packageData.images || [];

//         // Создать и добавить изображения в div
//         packageImages.forEach(function(imageSrc) {
//             var img = document.createElement('img');
//             img.classList.add('image-example');
//             img.src = imageSrc;
//             img.alt = "Example image";
//             galleryDiv.appendChild(img);
//         });
//     }

//     checkUrlAndScroll();

// });

// document.addEventListener('DOMContentLoaded', initPackages);

// const tabData = {
//     "Website": [
//         {
//             name: "Web site online shop for Nike",
//             link: "www.nike.com"
//         },
//         {
//             name: "Web site online shop for Adidas",
//             link: "www.nike.com"
//         },
//         {
//             name: "Web site online shop for Puma",
//             link: "www.nike.com"
//         },
//         {
//             name: "Web site online shop for Reebok",
//             link: "www.nike.com"
//         }
//     ],
//     "Application": [
//         {
//             name: "Mobile App for Fitness",
//             link: "www.nike.com"
//         },
//         {
//             name: "Mobile App for Nutrition",
//             link: "www.nike.com"
//         },
//         {
//             name: "Mobile App for Meditation",
//             link: "www.nike.com"
//         },
//         {
//             name: "Mobile App for Running",
//             link: "www.nike.com"
//         }
//     ]
// };

// function initPackages() {
//     updatePackages("Website"); // Инициализация с первой вкладкой
// }

// function updatePackages(tabName) {
//     const packages = document.querySelectorAll('.work-package');
//     const data = tabData[tabName] || [];

//     // Сначала удаляем класс 'active-package' у всех пакетов
//     packages.forEach(packageElem => {
//         packageElem.classList.remove('active-package');
//         packageElem.style.display = "none"; // Скрываем все элементы
//     });

//     // Теперь добавляем класс 'active-package' к нужным пакетам с большей задержкой
//     packages.forEach((packageElem, index) => {
//         if (data[index]) {
//             const nameExample = packageElem.querySelector('.name-example');
//             const linkText = packageElem.querySelector('.link-example .link-text');

//             nameExample.textContent = data[index].name;
//             linkText.textContent = data[index].link;

//             packageElem.style.display = ""; // Показываем элемент

//             // Задержка перед добавлением класса для анимации
//             setTimeout(() => {
//                 packageElem.classList.add('active-package');
//             }, 100 + 150 * index); // Увеличиваем начальную задержку
//         }
//     });
// }




$(document).ready(function() {
    // Инициализация первой вкладки как активной
    $('.tabs div:first-child').addClass('active-tab');

    // Обработчик клика по вкладке
    $('.tabs div').click(function(){
        // Удаляем класс 'active-tab' у всех вкладок
        $('.tabs div').removeClass('active-tab');
        // Добавляем класс 'active-tab' к нажатой вкладке
        $(this).addClass('active-tab');
        // Обновляем пакеты в соответствии с выбранной вкладкой
        updatePackages($(this).text().trim());
    });

    // Проверяем параметры URL и выполняем прокрутку, если необходимо
    checkUrlAndScroll();
});

// Событие загрузки контента
document.addEventListener('DOMContentLoaded', initPackages);

// Данные для каждой вкладки
const tabData = {
    "Website": [
        {
            name: "Web site online shop for Nike",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Web site online shop for Adidas",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Web site online shop for Puma",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Web site online shop for Reebok",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        }
    
    ],
    "Application": [
        {
            name: "Mobile App for Fitness",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Mobile App for Nutrition",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Mobile App for Meditation",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        },
        {
            name: "Mobile App for Running",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle2.png',
                'src/dle2.png'
            ]
        }
    ]

};

// Функция для инициализации пакетов
function initPackages() {
    updatePackages("Website");
}

// Функция для обновления пакетов
function updatePackages(tabName) {
    const packages = document.querySelectorAll('.work-package');
    const data = tabData[tabName] || [];

    packages.forEach(packageElem => {
        packageElem.classList.remove('active-package');
        packageElem.style.display = "none";
    });

    packages.forEach((packageElem, index) => {
        if (data[index]) {
            const nameExample = packageElem.querySelector('.name-example');
            const linkText = packageElem.querySelector('.link-example .link-text');

            nameExample.textContent = data[index].name;
            linkText.textContent = data[index].link;

            packageElem.style.display = "";

            setTimeout(() => {
                packageElem.classList.add('active-package');
            }, 100 + 150 * index);

            // Обновляем галерею изображений для пакета
            updateGallery(tabName, packageElem, data[index]);
        }
    });
}

// Функция для обновления галереи изображений в пакете
function updateGallery(tabName, packageElem, packageData) {
    var galleryDiv = packageElem.querySelector('.content-works');
    galleryDiv.innerHTML = '';

    var packageImages = packageData.images || [];

    packageImages.forEach(function(imageSrc) {
        var img = document.createElement('img');
        img.classList.add('image-example');
        img.src = imageSrc;
        img.alt = "Example image";
        galleryDiv.appendChild(img);
    });
}

// Функция для проверки параметров URL и выполнения прокрутки страницы
function checkUrlAndScroll() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    if (tab) {
        const tabElement = $('.tabs div').filter(function() {
            return $(this).text().trim() === tab;
        });

        if (tabElement.length) {
            $('.tabs div').removeClass('active-tab');
            tabElement.addClass('active-tab');
            updatePackages(tab);

            $('html, body').animate({
                scrollTop: $('.tabs').offset().top - 100
            }, 1000);
        }
    }
}
