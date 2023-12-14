document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section) {
        const targetElement = document.getElementById(section);
        if (targetElement) {
            setTimeout(function() {
                // Вычисляем позицию элемента и вычитаем 100 пикселей
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100); // задержка для учета загрузки страницы
        }
    }
});


  
function rearrangeElements() {
    const container = document.querySelector('.container');
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    const aboutHeading = document.querySelector('.about-heading');
    const textbox = document.querySelector('.textbox');
    const textbox2 = document.querySelector('.textbox2');

    if (window.innerWidth <= 576) {
        // Для экранов шириной до 578px
        container.appendChild(aboutHeading);
        container.appendChild(textbox2);
        container.appendChild(aboutImage);
        container.appendChild(textbox);
    } else {
        // Для экранов шириной более 578px
        aboutContent.insertBefore(aboutHeading, aboutContent.firstChild);
        aboutContent.appendChild(textbox);
        aboutContent.appendChild(textbox2);
        container.insertBefore(aboutImage, aboutContent);
    }
}

// Вызов функции при загрузке страницы
window.addEventListener('load', rearrangeElements);

// Вызов функции при изменении размера окна
window.addEventListener('resize', rearrangeElements);

  
  
  