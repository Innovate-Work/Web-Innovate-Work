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



    const form = document.getElementById('validation-form');
    const inputs = form.querySelectorAll('input');
    
    function showInputError(input) {
        const errorDiv = document.getElementById(input.id + '-error');
        if (input.validity.valueMissing) {
            errorDiv.textContent = 'This field is required.';
            errorDiv.style.display = 'block';
        } else if (input.validity.patternMismatch) {
            if (input.type === "email") {
                errorDiv.textContent = 'Please enter a valid email.';
            } else if (input.type === "tel") {
                errorDiv.textContent = 'Please enter a valid phone number.';
            }
            errorDiv.style.display = 'block';
        } else {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
    
    function validateForm(e) {
        e.preventDefault();
    
        let valid = true;
        let errorMessage = "";
    
        inputs.forEach(input => {
            if (!input.validity.valid) {
                valid = false;
                if (input.validity.valueMissing) {
                    errorMessage += `Field ${input.placeholder} is required.\n`;
                } else if (input.validity.patternMismatch) {
                    if (input.type === "email") {
                        errorMessage += 'Please enter a valid email.\n';
                    } else if (input.type === "tel") {
                        errorMessage += 'Please enter a valid phone number.\n';
                    }
                }
                showInputError(input);
            } else {
                document.getElementById(input.id + '-error').style.display = 'none';
            }
        });
    
        if (!valid) {
            alert(errorMessage);
        } else {
            form.submit();
        }
    }
    
    form.addEventListener('submit', validateForm);
    
    
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
      

