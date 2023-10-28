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
    const customInterfaceButton = document.querySelector('.service-button:nth-child(1)');
    const maintenanceButton = document.querySelector('.service-button:nth-child(2)');

    let selectedPackage = null;

    packages.forEach(pkg => {
        pkg.addEventListener('click', function() {
            packages.forEach(p => p.classList.remove('selected'));
            pkg.classList.add('selected');
            selectedPackage = pkg;
        });
    });

    nextButton.addEventListener('click', function() {
        if (selectedPackage) {
            const packageName = selectedPackage.querySelector('h2').innerText;
            while (packageFeatures.firstChild) {
                packageFeatures.removeChild(packageFeatures.firstChild);
            }
            packageNameSpan.innerText = packageName.toUpperCase();
            const features = selectedPackage.querySelectorAll('ul li');
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.textContent;
                packageFeatures.appendChild(li);
            });
            modal.style.display = 'block';
        }
    });

    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        customInterfaceButton.setAttribute('data-active', 'false');
        maintenanceButton.setAttribute('data-active', 'false');
        customInterfaceButton.classList.remove('active-button-class');
        maintenanceButton.classList.remove('active-button-class');
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

    document.addEventListener("DOMContentLoaded", function(event) {
        // Получаем все элементы с классом nav-item
        const navItems = document.querySelectorAll('.nav-item');
        let currentPage = localStorage.getItem('currentPage');

        navItems.forEach((item) => {
            if(item.getAttribute('data-link') === currentPage) {
                item.classList.add('nav-item-active');
            } else {
                item.classList.remove('nav-item-active');
            }

            item.addEventListener('click', function() {
                // Убираем класс nav-item-active со всех элементов
                navItems.forEach((innerItem) => innerItem.classList.remove('nav-item-active'));
                // Добавляем класс nav-item-active к нажатому элементу
                this.classList.add('nav-item-active');
                localStorage.setItem('currentPage', this.getAttribute('data-link'));
            });
        });

        // Убираем выделение у всех элементов меню при нажатии на логотип
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', function() {
            navItems.forEach((item) => item.classList.remove('nav-item-active'));
            localStorage.removeItem('currentPage'); // Удаляем текущую страницу из localStorage
        });
    });



