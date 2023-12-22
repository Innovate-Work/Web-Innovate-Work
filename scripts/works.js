
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
            name: "Web site online shop for Nike",
            link: "www.nike.com",
            images: [
                'src/dle2.png',
                'src/dle1.png',
                'src/dle3.png'
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
                'src/dle3.png',
                'src/dle2.png',
                'src/dle1.png'
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

    packageImages.forEach(function(imageSrc, index) {
        var img = document.createElement('img');
        img.classList.add('image-example');
        img.src = imageSrc;
        img.alt = "Example image";
        img.setAttribute('data-index', index);
        galleryDiv.appendChild(img);
    });
}




// Получаем элементы для модального окна
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var currentImages = []; // Массив для хранения изображений текущего пакета
var currentIndex = 0; // Индекс текущего изображения в модальном окне


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('image-example')) {
        var parentGallery = event.target.closest('.content-works');
        currentImages = [];

        // Получение всех изображений в галерее
        parentGallery.querySelectorAll('.image-example').forEach(function(img) {
            currentImages.push(img.src);
        });

        // Переворачиваем массив, чтобы последний элемент стал первым
        currentImages.reverse();

        // Устанавливаем currentIndex в 0, чтобы начать с первого элемента перевернутого массива
        currentIndex = 0;

        modal.style.display = "block";
        modalImg.src = currentImages[currentIndex];
        updateArrowsAndDots(currentIndex, currentImages.length);
    }
});





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
        modal.style.display = 'none';
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

    if (tab) {
        const tabs = Array.from(document.querySelectorAll('.tabs div'));
        const tabElement = tabs.find(function(elem) {
            return elem.textContent.trim() === tab;
        });

        if (tabElement) {
            tabs.forEach(elem => elem.classList.remove('active-tab'));
            tabElement.classList.add('active-tab');
            updatePackages(tab);

            window.scrollTo({
                top: document.querySelector('.tabs').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', initPackages);

// swipe

// var touchStartX = 0;
// var touchEndX = 0;

// function handleTouchStart(event) {
//     touchStartX = event.touches[0].clientX;
// }

// function handleTouchMove(event) {
//     touchEndX = event.touches[0].clientX;
// }

// function handleTouchEnd() {
//     if (touchEndX < touchStartX - 30) {
//         // Свайп влево
//         showImage(currentIndex + 1);
//     }
//     if (touchEndX > touchStartX + 30) {
//         // Свайп вправо
//         showImage(currentIndex - 1);
//     }
// }

modal.addEventListener('touchstart', handleTouchStart, false);
modal.addEventListener('touchmove', handleTouchMove, false);
modal.addEventListener('touchend', handleTouchEnd, false);

function updateModalForMobile() {
    const isMobile = window.matchMedia("(max-width: 576px)").matches;

    const modalContent = document.getElementById("img01");
    if (isMobile) {
        modalContent.classList.add('swiper-container');

        // Создаем обертку слайдера
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        modalContent.appendChild(swiperWrapper);

        // Перемещаем изображения внутрь обертки слайдера
        currentImages.forEach((src) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('modal-image');
            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        // Инициализация слайдера
        initializeSlider();
    } else {
        // Возвращаем к исходному виду для не мобильных устройств
        resetModalToOriginal();
    }
}

var swiperInstance = null; // Глобальная переменная для хранения экземпляра Swiper

function initializeSlider() {
    if (!swiperInstance) { // Проверка, существует ли экземпляр Swiper
        swiperInstance = new Swiper('.swiper-container', {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}

function resetModalToOriginal() {
    const modalContent = document.getElementById("img01");
    modalContent.classList.remove('swiper-container');
    modalContent.innerHTML = ''; // Очищаем содержимое
    swiperInstance = null;
}

document.addEventListener('DOMContentLoaded', function() {
    initPackages();
    updateModalForMobile();
});

window.addEventListener('resize', updateModalForMobile);
