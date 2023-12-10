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


  
  
  
  