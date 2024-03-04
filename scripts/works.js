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
    initPackages();
});

// Событие загрузки контента
document.addEventListener('DOMContentLoaded', initPackages);

// Данные для каждой вкладки
const tabData = {
    "Website": [
        {
            name: "Ceramic Studio",
            link: "www.nike.com",
            images: [
                'src/work_web1_5.png',
                'src/work_web1_4.png',
                'src/work_web1_3.png',
                'src/work_web1_2.png',
                'src/work_web1_1.png'
            ],
            description: "A database is used to display the product catalog. For successful payment, there are sessions and payment gateway integrations"
        },
        {
            name: "Order accounting",
            link: "www.nike.com",
            images: [
                'src/work_web2_4.png',
                'src/work_web2_3.png',
                'src/work_web2_2.png',
                'src/work_web2_1.png'
            ],
            description: "This application features a database of actual items, the ability to add them to favorites and shopping cart. Registration and payment for purchase"
        },
        {
            name: "Furniture store",
            link: "www.nike.com",
            images: [
                'src/work_web3_4.png',
                'src/work_web3_3.png',
                'src/work_web3_2.png',
                'src/work_web3_1.png'
            ],
            description: "The site features a wishlist function for bookmarking favorite items. Secure payment integrations ensure a safe transactional experience"
        },
        // {
        //     name: "Web site online shop for Reebok",
        //     link: "www.nike.com",
        //     images: [
        //         'src/dle2.png',
        //         'src/dle2.png',
        //         'src/dle2.png'
        //     ],
        //     description: ""
        // }
    
    ],
    "Application": [
        {
            name: "Natural cosmetics store apps",
            link: "www.nike.com",
            images: [
                'src/work1_3.png',
                'src/work1_2.png',
                'src/work1_1.png'
            ],
            description: "This application features a database of actual items, the ability to add them to favorites and shoppingcart. Registration and payment for purchase"
        },
        {
            name: "Planning app",
            link: "www.nike.com",
            images: [
                'src/work2_3.png',
                'src/work2_2.png',
                'src/work2_1.png'
            ],
            description: "This is a task management app that offers features like task prioritization, recurring tasks, and habit tracking"
        },
        {
            name: "Fitness app",
            link: "www.nike.com",
            images: [
                'src/work3_2.png',
                'src/work3_1.png'
            ],
            description: "This app helps users track their diet and exercise, offering a vast database of foods and exercises to monitor calorie intake and expenditure"
        },
        // {
        //     name: "Mobile App for Running",
        //     link: "www.nike.com",
        //     images: [
        //         'src/dle2.png',
        //         'src/dle2.png',
        //         'src/work3.svg'
        //     ],
        //   description: ""
        // }
    ]

};

// Функция для инициализации пакетов
function initPackages() {
    // Попытка получить параметр 'tab' из URL
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    // Проверяем, есть ли параметр 'tab' и соответствует ли он одной из вкладок
    if (tab && tabData.hasOwnProperty(tab)) {
        updatePackages(tab); // Инициализируем с этой вкладкой
    } else {
        updatePackages("Website"); // Или по умолчанию инициализируем вкладку "Website"
    }
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
            const descriptionWorks = packageElem.querySelector('.description-works');

            nameExample.textContent = data[index].name;
            linkText.textContent = data[index].link;
            descriptionWorks.innerHTML = data[index].description;

            packageElem.style.display = "";

            setTimeout(() => {
                packageElem.classList.add('active-package');
            }, 100 + 150 * index);

            // Обновляем галерею изображений для пакета
            updateGallery(tabName, packageElem, data[index]);
        }
    });
}

function updateGallery(tabName, packageElem, packageData) {
    var galleryDiv = packageElem.querySelector('.content-works');
    galleryDiv.innerHTML = '';

    var packageImages = packageData.images || [];

    packageImages.forEach(function(imageSrc, index) {
        var img = document.createElement('img');
        img.classList.add('image-example');
        img.loading = 'lazy'; // Ленивая загрузка
        img.src = imageSrc; // Обновите это, если используете data-src
        img.alt = "Example image";
        galleryDiv.appendChild(img);
    });
}




// Получаем элементы для модального окна
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var currentImages = []; // Массив для хранения изображений текущего пакета
var currentIndex = 0; // Индекс текущего изображения в модальном окне


function showImage(index) {
    if (index < 0) {
        index = currentImages.length - 1;
    } else if (index >= currentImages.length) {
        index = 0;
    }
    
    modalImg.src = currentImages[index];
    currentIndex = index;
    updateArrowsAndDots(currentIndex, currentImages.length);
}

function updateArrowsAndDots(currentIndex, totalImages) {
    const isMobile = window.matchMedia("(max-width: 576px)").matches;

    if (!isMobile) {
        const prevArrow = document.querySelector('.prev');
        const nextArrow = document.querySelector('.next');
        prevArrow.style.display = currentIndex === 0 ? 'none' : 'block';
        nextArrow.style.display = currentIndex === totalImages - 1 ? 'none' : 'block';
    }

    createIndicators(currentIndex, totalImages);
}


function createIndicators(currentIndex, totalImages) {
    const indicatorsContainer = document.querySelector('.modal-slider-indicators');
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot' + (i === currentIndex ? ' active' : '');
        indicatorsContainer.appendChild(dot);
    }
}

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelector('.prev').addEventListener('click', function(){
    showImage(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', function(){
    showImage(currentIndex + 1);
});

// Функция для проверки параметров URL и выполнения прокрутки страницы
function checkUrlAndScroll() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    const tabs = Array.from(document.querySelectorAll('.tabs div'));

    if (tab) {
        const tabElement = tabs.find(elem => elem.textContent.trim() === tab);

        if (tabElement) {
            tabs.forEach(elem => elem.classList.remove('active-tab'));
            tabElement.classList.add('active-tab');
            updatePackages(tab);

            // Добавляем небольшую задержку перед скроллом
            setTimeout(() => {
                const targetElement = document.querySelector('.tabs');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Задержка в 100 миллисекунд
        }
    }
}



// swipe

function setupMobileImagesForModal(images) {
    // Удаляем старый контент изображения, если он есть
    if (modalImg) {
        modalImg.remove();
        modalImg = null; // Удаляем ссылку на старое изображение
    }

    let imagesContainer = document.querySelector('.images-container');
    if (!imagesContainer) {
        imagesContainer = document.createElement('div');
        imagesContainer.classList.add('images-container');
        document.querySelector('.modal-content-wrapper').appendChild(imagesContainer);
    } else {
        imagesContainer.innerHTML = '';
    }

    images.forEach(src => {
        const img = document.createElement('img');
        img.classList.add('modal-content');
        img.src = src;
        imagesContainer.appendChild(img);
    });

    imagesContainer.scrollLeft = 0;

    // Теперь добавляем обработчик событий 'scroll'
    imagesContainer.addEventListener('scroll', updateActiveIndicator);

    // Вызываем функцию для установки начального активного индикатора
    updateActiveIndicator();
}

// ...

// Проверяем, существует ли элемент .images-container перед добавлением обработчика событий
if (document.querySelector('.images-container')) {
    document.querySelector('.images-container').addEventListener('scroll', updateActiveIndicator);
}


function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Отключаем скролл на основной странице
}

// Функция для закрытия модального окна
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Восстанавливаем скролл
}

// Модифицируем обработчик клика для открытия модального окна
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('image-example')) {
        var parentGallery = event.target.closest('.content-works');
        currentImages = [];

        parentGallery.querySelectorAll('.image-example').forEach(function(img) {
            currentImages.push(img.src);
        });

        currentImages.reverse();
        currentIndex = 0;

        // Показываем модальное окно
        modal.style.display = "block";

        // Проверяем, нужно ли настраивать галерею для мобильных устройств
        const isMobile = window.matchMedia("(max-width: 576px)").matches;
        if (isMobile) {
            setupMobileImagesForModal(currentImages);
        } else {
            // Для не мобильных устройств просто устанавливаем src для одного изображения
            if (modalImg) {
                modalImg.src = currentImages[currentIndex];
            }
        }
        openModal();
        updateArrowsAndDots(currentIndex, currentImages.length);
    }
});

function updateActiveIndicator() {
    // Находим контейнер и вычисляем центр экрана
    const container = document.querySelector('.images-container');
    const centerPoint = container.scrollLeft + container.offsetWidth / 2;

    // Определяем, какое изображение находится в центре
    let minDistance = Infinity;
    let closestChild = 0;
    container.childNodes.forEach((child, index) => {
        // Ищем центр каждого изображения
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        // Вычисляем, насколько близко центр изображения к центру контейнера
        const distance = Math.abs(childCenter - centerPoint);
        if (distance < minDistance) {
            minDistance = distance;
            closestChild = index;
        }
    });

    // Обновляем индикаторы
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        if (index === closestChild) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


