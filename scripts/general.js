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

window.onload = function() {
    var contactLink = document.querySelector('.contacts a');
    var contactPopup = document.getElementById('contact-popup');
    var header = document.querySelector('.staticHeader');

    function positionPopup() {
        var headerBottom = header.getBoundingClientRect().bottom;
        contactPopup.style.top = (headerBottom + 10) + 'px'; // Position the popup 10px below the header
    }

    function togglePopup(event) {
        event.preventDefault(); // Prevent the default action of the link
        contactPopup.classList.toggle('active'); // Toggle the popup visibility
        contactLink.classList.toggle('contact-active'); // Toggle the active link color
        contactPopup.style.display = contactPopup.classList.contains('active') ? 'block' : 'none';
        positionPopup(); // Update position when the popup is toggled
    }

    contactLink.addEventListener('click', togglePopup);

    // Adjust the position of the popup when the window is resized or scrolled
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        window.cancelAnimationFrame(scrollTimeout);
        scrollTimeout = window.requestAnimationFrame(positionPopup);
    });

    window.addEventListener('resize', positionPopup);

    // Close the popup when clicking outside of it
    window.addEventListener('click', function (event) {
        if (!contactPopup.contains(event.target) && !contactLink.contains(event.target) && contactPopup.classList.contains('active')) {
            contactPopup.classList.remove('active');
            contactPopup.style.display = 'none'; // Hide the popup
            contactLink.classList.remove('contact-active'); // Revert the link color
        }
    });

    // Initial positioning
    positionPopup();
};










document.addEventListener('DOMContentLoaded', function() {
    let currentPath = window.location.pathname.split('/').pop().replace('.html', ''); // получаем имя текущего файла без расширения
    let navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        if (link.getAttribute('data-link') === currentPath) {
            link.classList.add('nav-item-active'); 
        } else {
            link.classList.remove('nav-item-active');
        }
    });
});
    
    
    // Открытие меню
document.querySelector('.menu-icon').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'flex';
  });
  
  // Закрытие меню
  document.querySelector('.close-menu').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
  });
  



    document.addEventListener('DOMContentLoaded', function() {
        var contactsTrigger = document.querySelector('.contacts-trigger');
        var contactsInfo = document.querySelector('.contacts-info');
        var arrow = contactsTrigger.querySelector('img');
      
        contactsTrigger.addEventListener('click', function() {
          var isShown = contactsInfo.classList.contains('show');
          if (isShown) {
            contactsInfo.classList.remove('show');
            arrow.classList.remove('down');
          } else {
            contactsInfo.classList.add('show');
            arrow.classList.add('down');
          }
        });
      });
      

// transition 


document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash; // получаем якорь из URL
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(function() {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }, 100); // небольшая задержка для учета загрузки страницы
        }
    }
});



// document.querySelectorAll('.nav-item').forEach(link => {
//     link.addEventListener('click', function(e) {
//         e.preventDefault(); // Предотвращаем стандартный переход по ссылке
//         const href = this.getAttribute('href');

//         // Анимация выхода
//         document.querySelector('.page-transition-overlay').classList.add('visible');

//         // Загружаем новую страницу после анимации
//         setTimeout(() => {
//             window.location.href = href;
//         }, 500); // 500 мс - время анимации выхода
//     });
// });

// window.addEventListener('load', () => {
//     // Анимация входа
//     document.querySelector('.page-transition-overlay').classList.remove('visible');
// });
