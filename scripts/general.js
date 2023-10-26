document.addEventListener('DOMContentLoaded', function() {
    let currentPath = window.location.pathname; // Get the current path including the leading slash
    let navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        // Check if the 'href' attribute matches the current path
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('nav-item-active'); // Add the 'nav-item-active' class
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('staticHeader');
        if (header) {
            if (window.scrollY > 0) {
                header.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById('myModal');
    var btns = document.querySelectorAll('.next-button');
    var closeBtn = document.querySelector('.close');
    
    btns.forEach(function(btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});


// pop up action
document.addEventListener('DOMContentLoaded', function() {
    const packages = document.querySelectorAll('.package');
    const modal = document.querySelector('.modal');
    const modalText = modal.querySelector('.modal-text');
    const packageNameSpan = modalText.querySelector('.package-name');
    const packageFeatures = modalText.querySelector('ul');
    const nextButton = document.querySelector('.next-button');

   

    let selectedPackage = null;

    packages.forEach(pkg => {
        pkg.addEventListener('click', function() {
            // Убираем выделение с других пакетов
            packages.forEach(p => p.classList.remove('selected'));
            // Добавляем выделение на текущий пакет
            pkg.classList.add('selected');
            selectedPackage = pkg;
        });
    });

    nextButton.addEventListener('click', function() {
        if (selectedPackage) {
            // Получаем имя пакета
            const packageName = selectedPackage.querySelector('h2').innerText;

            // Очистка текущего списка функций в модальном окне
            while (packageFeatures.firstChild) {
                packageFeatures.removeChild(packageFeatures.firstChild);
            }

            // Заполняем имя пакета
            packageNameSpan.innerText = packageName.toUpperCase();

            // Заполняем функции пакета
            const features = selectedPackage.querySelectorAll('ul li');
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.textContent;
                packageFeatures.appendChild(li);
            });

            // Показываем модальное окно
            modal.style.display = 'block';

            // Закрытие модального окна при нажатии на крестик
            modal.querySelector('.close').addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
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

