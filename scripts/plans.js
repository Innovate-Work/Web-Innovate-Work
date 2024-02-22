$(document).ready(function () {
  $(".tabs div:first-child").addClass("active-tab");

  $(".tabs div").click(function () {
    $(".tabs div").removeClass("active-tab");
    $(this).addClass("active-tab");
    updatePackages($(this).find("p").text().trim());
  });

  $(".cells-block .cell").click(function () {
    const targetTab = $(this).data("target-tab");
    window.location.href =
      "your_new_page_url.html?tab=" + encodeURIComponent(targetTab);
  });

  // Function to check URL and scroll to the appropriate tab
  function checkUrlAndScroll() {
    const urlParams = new URLSearchParams(window.location.search);
    const tabName = urlParams.get("tab");

    if (tabName) {
      $(".tabs div").each(function () {
        if ($(this).text().trim() === tabName) {
          $(this).click(); // Activate the tab
          $("html, body").animate(
            {
              scrollTop: $(".tabs").offset().top - 100,
            },
            1000
          );
        }
      });
    }
  }

  // Call the function when the page loads
  checkUrlAndScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  initPackages();
  // Call updatePackages with the first tab's name to initialize content
  updatePackages($(".tabs div:first-child").text().trim());
});

const tabData = {
  Website: [
    {
      title: "Basic",
      features: [
        "Basic website development",
        "Pre-designed templates",
        "Limited customization",
        "Standard features",
        "Ideal for small businesses",
      ],
      price: "$500",
    },
    {
      title: "Professional",
      features: [
        "Custom website development",
        "Tailored design",
        "Enhanced features",
        "Basic SEO optimization",
        "Suitable for growing businesses",
      ],
      price: "$1000",
    },
    {
      title: "Business",
      features: [
        "Complex website development",
        "Highly customized solution",
        "Advanced features",
        "Comprehensive SEO",
        "Designed for large corporations",
      ],
      price: "$5000",
    },
  ],
  Application: [
    {
      title: "Basic",
      features: [
        "Basic mobile app for iOS/Android",
        "Pre-designed app templates",
        "Limited customization",
        "Standard features",
        "Ideal for individuals/small businesses",
      ],
      price: "$5000",
    },
    {
      title: "Professional",
      features: [
        "Custom mobile app development",
        "User-friendly interface design",
        "Integration with backend services",
        "App testing and deployment",
        "Suitable for growing businesses and startups",
      ],
      price: "$10000",
    },
    {
      title: "Business",
      features: [
        "Complex app development",
        "Highly customized solution",
        "Advanced features",
        "Testing and optimization",
        "Designed for larger corporations and organizations",
      ],
      price: "$15000",
    },
  ],
  "Application and Website": [
    {
      title: "Web and App",
      features: [
        "Custom website and mobile app development",
        "Tailored design to match brand identity",
        "User authentication, e-commerce",
        "Comprehensive SEO, performance optimization, and app testing",
        "Suitable for businesses requiring both web and mobile presence",
      ],
      price: "$5400",
    },
  ],
};

function initPackages() {
  const packages = document.querySelectorAll(".package");
  packages.forEach((packageElem, index) => {
    setTimeout(() => {
      packageElem.style.transform = "translateY(0)";
      packageElem.style.opacity = "1";
    }, 150 * (index + 1));
  });
}

const overTableText = document.querySelector("#overTableText");

function updatePackages(tabName) {
  const packages = document.querySelectorAll(".package");
  const data = tabData[tabName];

  // Устанавливаем начальные стили для анимации
  packages.forEach((packageElem, index) => {
    packageElem.style.transition = "none"; // Отключаем анимацию для мгновенного применения стилей
    packageElem.style.transform = "translateY(50px)"; // Начинаем снизу
    packageElem.style.opacity = "0"; // Полностью прозрачный

    if (tabName === "Application and Website" && index > 0) {
      packageElem.style.display = "none";
      overTableText.style.width = "40%";
    } else {
      packageElem.style.display = "block";
      overTableText.style.width = "66.5%";
    }
  });

  if (tabName === "Application and Website") {
    packages[0].style.width = "707px";
    packages[0].style.height = "auto";
    packages[0].style.margin = "0 auto"; // Для центрирования
  } else {
    packages.forEach((packageElem) => {
      packageElem.style.width = "340px"; // Возвращаем первоначальные размеры
      packageElem.style.height = "auto";

      // Условие для вкладки "Application"
      if (tabName === "Application") {
        packageElem.style.height = "auto"; // Увеличиваем на 10px
      } else {
        packageElem.style.height = "auto"; // Оригинальная высота
      }

      packageElem.style.margin = "0"; // Убираем стили центрирования
    });
  }

  packages.forEach((packageElem, index) => {
    if (data[index]) {
      const title = packageElem.querySelector("h2");
      const featureList = packageElem.querySelector("ul");
      const price = packageElem.querySelector(".price");

      // Очистка текущего списка функций
      while (featureList.firstChild) {
        featureList.removeChild(featureList.firstChild);
      }

      // Добавление новых функций
      data[index].features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        featureList.appendChild(li);
      });

      title.textContent = data[index].title;
      const priceSpan = price.querySelector("span");
      const priceValue = document.createTextNode(data[index].price);
      if (priceSpan.nextSibling) {
        price.replaceChild(priceValue, priceSpan.nextSibling);
      } else {
        price.appendChild(priceValue);
      }

      // Включаем анимацию и применяем конечные стили
      setTimeout(() => {
        packageElem.style.transition = ""; // Включаем анимацию
        packageElem.style.transform = "translateY(0)"; // Перемещаем в исходное положение
        packageElem.style.opacity = "1"; // Делаем видимым
      }, 150 * (index + 1));
    }
  });
}

document.querySelectorAll(".tabs div").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabName = e.target.textContent.trim();
    const packages = document.querySelectorAll(".package");
    packages.forEach((p) => p.classList.remove("selected"));
    updatePackages(tabName);

    // Сброс класса 'active-tab' для всех вкладок и установка его для текущей вкладки
    document
      .querySelectorAll(".tabs div")
      .forEach((t) => t.classList.remove("active-tab"));
    tab.classList.add("active-tab");
  });
});

// temp code
// document.querySelector('#myModal').style.display = 'block';



const packetsData = [
	{
		'name': 'basic',
		'price': 500,
    // можно добавить какие хочешь поля
    // можно в json переместить, оттуда читать
	},
	{
		'name': 'professional',
		'price': 1000,
	},
	{
		'name': 'business',
		'price': 5000,
	}
];



// new pop up action code

// scroll options
// ...

// tooltip
const tooltipTrigger = document.querySelector('#tooltip-trigger');
const tooltip = document.querySelector('#tooltip');

tooltipTrigger.addEventListener('mouseover', () => {
  tooltip.classList.add('show');
});

tooltipTrigger.addEventListener('mouseout', () => {
  tooltip.classList.remove('show');
});


// очистка формы
const clearForm = (serviceButtonList, inputList, submitButton) => {
  serviceButtonList.forEach(button => {
    button.setAttribute('data-active', 'false');
  });

  inputList.forEach(input => {
    input.value = '';  
  });

  submitButton.classList.remove('highlight');
}

// поля формы заполнены?
const isFormFilled = (inputList) => {
  for (let input of inputList) {
    if (input.value.trim() === '') {
      return false;
    }
  }

  return true;
}

// подсветить кнопку отправки если форма не содержит пустых полей
const highlightSubmitButton = (inputList, submitButton) => {
  isFormFilled(inputList) 
    ? submitButton.classList.add('highlight') 
    : submitButton.classList.remove('highlight'); 
}

document.addEventListener('DOMContentLoaded', () => {

  // modal window
  const modal = document.querySelector('#myModal');

  // получаем со страницы кнопки и помещаем их в массив
  const buttonsPacket1 = document.querySelectorAll('.show-handle-button-packet-1');
  const buttonsPacket2 = document.querySelectorAll('.show-handle-button-packet-2');
  const buttonsPacket3 = document.querySelectorAll('.show-handle-button-packet-3');
  const buttonsPacketList = [buttonsPacket1, buttonsPacket2, buttonsPacket3];

  // перебираем кнопки
  buttonsPacketList.forEach(buttonsPacket => {
    buttonsPacket.forEach(button => {
      button.addEventListener('click', (e) => {

        // отключаем скролл на body при открытии модального окна
        window.innerWidth >= 1200 ? document.body.classList.add('modal-open') : null;
        
        // ???????????????????????????
        // window.innerWidth < 1200 ? modal.style.overflow = 'scroll' : null;
        

        // вытаскиваем из названия класса номер пакета
        const className = e.target.className.match(/show-handle-button-packet-\d+/g)[0];
        const packetNumber = Number(className.charAt(className.length - 1));

        // берем данные выбранного пакета
        const packetData = packetsData[packetNumber - 1];

        // пример подстановки данных в пакет, можно добавить другие
        document.querySelector('.package-name').textContent = packetData.name;

        // тоггл для опциональных импутов
        function toggleServiceButton() {
          const isActive = this.getAttribute('data-active') === 'true';
          this.setAttribute('data-active', String(!isActive));
        }

        // опциональные инпуты
        const serviceButtonList = document.querySelectorAll('.service-button');
        serviceButtonList.forEach(button => {
          button.addEventListener('click', toggleServiceButton);
        });

        // получаем элементы формы 
        // потом подсвечиваем кнопку отправки если поля формы не пустые 
        const inputList = document.querySelectorAll('.input-wrapper > input');
        const submitButton = document.querySelector('.submit-button-pop-up');

        function handleInput() {
          highlightSubmitButton(inputList, submitButton);
        }

        inputList.forEach(input => {
          input.addEventListener('input', handleInput);
        });

        // отображение на странице модального окна
        modal.style.display = 'block';

        // крестик для скрытия модального окна и очистки формы
        const closeCrossIcon = document.querySelector('.close');

        closeCrossIcon.addEventListener('click', () => {
          // Скрытие модального окна и очистка формы
          modal.style.display = 'none';

          // отключаем скролл на body при открытии модального окна
          window.innerWidth >= 1200 ? document.body.classList.remove('modal-open') : null;  

          // очистка формы 
          clearForm(serviceButtonList, inputList, submitButton);

          // Удаление обработчиков событий
          serviceButtonList.forEach(button => {
            button.removeEventListener('click', toggleServiceButton);
          });

          inputList.forEach(input => {
            input.removeEventListener('input', handleInput);
          });

        });

        // Проверка ширины экрана и прокрутка к модальному блоку на мобильных устройствах
        if (window.innerWidth <= 1200) {
          const modalTop = modal.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top: modalTop, behavior: "smooth" });
        }
      });
    });
  });
});


// // pop up action
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const modalText = modal.querySelector(".modal-cell");
  const packageNameSpan = modalText.querySelector(".package-name"); // Убедитесь, что класс .package-name есть у элемента span внутри .modal-cell
  const packageFeatures = modalText.querySelector("ul");

  document.querySelectorAll(".package .button-view").forEach((button) => {
    button.addEventListener("click", function (event) {
      const packageElem = event.target.closest(".package");
      const packageName = packageElem.querySelector("h2").innerText;
      
      // Clear existing features
      while (packageFeatures.firstChild) {
        packageFeatures.removeChild(packageFeatures.firstChild);
      }
      packageNameSpan.innerText = packageName.toUpperCase(); // Эта строка теперь не закомментирована
      
      // Добавляем новые особенности пакета
      const features = packageElem.querySelectorAll("ul li");
      features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature.textContent;
        packageFeatures.appendChild(li);
      });
  });
});
});
//       modal.style.display = "block";

//       // Проверка ширины экрана и прокрутка к модальному блоку на мобильных устройствах
//       if (window.innerWidth <= 576) {
//         const modalTop =
//           modal.getBoundingClientRect().top + window.scrollY - 110; // Получаем позицию модального окна относительно верхнего края документа и вычитаем 60px
//         window.scrollTo({ top: modalTop, behavior: "smooth" }); // Плавная прокрутка к вычисленной позиции
//       }
//     });
//   });

//   var buttons = document.querySelectorAll(".service-button");
//   buttons.forEach(function (button) {
//     button.addEventListener("click", function () {
//       // Получаем текущее состояние и переключаем его
//       var isActive = this.getAttribute("data-active") === "true";
//       this.setAttribute("data-active", String(!isActive)); // Преобразуем булево значение в строку
//       // Если нужно, изменяем классы для визуального отображения состояния
//       this.classList.toggle("active-button-class", !isActive);
//     });
//   });

//   modal.querySelector(".close").addEventListener("click", function () {
//     modal.style.display = "none";
//     customInterfaceButton.setAttribute("data-active", "false");
//     maintenanceButton.setAttribute("data-active", "false");

//     // Удаляем классы, которые могли быть добавлены для визуального отображения активного состояния
//     customInterfaceButton.classList.remove("active-button-class");
//     maintenanceButton.classList.remove("active-button-class");
//   });
// });

const form = document.getElementById("validation-form");
const inputs = form.querySelectorAll("input");

function showInputError(input) {
  const errorDiv = document.getElementById(input.id + "-error");
  if (input.validity.valueMissing) {
    errorDiv.textContent = "This field is required.";
    errorDiv.style.display = "block";
  } else if (input.validity.patternMismatch) {
    if (input.type === "email") {
      errorDiv.textContent = "Please enter a valid email.";
    } else if (input.type === "tel") {
      errorDiv.textContent = "Please enter a valid phone number.";
    }
    errorDiv.style.display = "block";
  } else {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
}

// function validateForm(e) {
//     e.preventDefault();

//     let valid = true;
//     let errorMessage = "";

//     inputs.forEach(input => {
//         if (!input.validity.valid) {
//             valid = false;
//             if (input.validity.valueMissing) {
//                 errorMessage += `Field ${input.placeholder} is required.\n`;
//             } else if (input.validity.patternMismatch) {
//                 if (input.type === "email") {
//                     errorMessage += 'Please enter a valid email.\n';
//                 } else if (input.type === "tel") {
//                     errorMessage += 'Please enter a valid phone number.\n';
//                 }
//             }
//             showInputError(input);
//         } else {
//             document.getElementById(input.id + '-error').style.display = 'none';
//         }
//     });

//     if (!valid) {
//         alert(errorMessage);
//     } else {
//         form.submit();
//     }
// }

// form.addEventListener('submit', validateForm);

// for table swith

var dataForWebsite = [
  ["Basic", "$500"],
  ["Pro", "$1000"],
  ["Business", "$5000"],
  [
    "Basic website development",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Pre-designed Template",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
  ],
  [
    "Limited customization",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
  ],
  [
    "Standard feature (e.g. about us)",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Tailored Design to match brand identity",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Enhance Featuring (e.g contact form, blog)",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Best SEO Optimization",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Complex Website Development",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Highly customized solution",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Advanced Feature (user customization, ecommerce)",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Comprehensive SEO & performance optimization",
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-horizontal-rule">--</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
];

var dataForApplication = [
  ["Basic", "$5000"],
  ["Pro", "$10000"],
  ["Business", "$50000"],
  [
    "Basic mobile app development",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Pre-designed app templates",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Limited customization",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Standard app features",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Custom mobile app development",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "User-friendly interface design",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Integration with backend services",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "App testing and deployment",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Complex mobile app development",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Highly customized app solutions",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Advanced features (e.g., user authentication, payment processing)",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Comprehensive app testing and optimization",
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-horizontal-rule" style="color: #FFFFFF">-</i>',
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
];

var dataForWebAndApp = [
  ["Application and Website", "$20,000"],
  [
    "Custom website and mobile app development",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Tailored design to match brand identity",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Enhanced features for both web and app",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
  [
    "Comprehensive SEO, performance optimization, and app testing",
    '<i class="fa-solid fa-check" style="color: #c5ff68"></i>',
  ],
];

function updateTable(dataArray) {
  var table = document.querySelector(".feature-service-table tbody");
  var headers = document.querySelectorAll(".feature-service-table th");
  var headerDivs = document.querySelectorAll(
    ".feature-service-table .head-div"
  );

  // Определяем, используем ли мы массив данных для Web and App
  var isWebAndApp = dataArray === dataForWebAndApp;

  // Скрываем или показываем заголовки столбцов
  headers.forEach((header, index) => {
    header.style.display = isWebAndApp && index > 0 ? "none" : "";
  });

  // Скрываем или показываем блоки заголовков
  headerDivs.forEach((div, index) => {
    if (dataArray[index]) {
      var titleName = div.querySelector("h3");
      var pricePara = div.querySelector("p");
      pricePara.innerHTML = `<span>from</span> ${dataArray[index][1]}`;
      titleName.innerHTML = `${dataArray[index][0]}`;
      div.parentNode.style.display = isWebAndApp && index > 0 ? "none" : ""; // Скрываем или показываем родительский элемент
    }
  });

  // Удаляем старые строки
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Добавляем новые строки
  dataArray.forEach(function (rowItems, rowIndex) {
    // Пропускаем строки заголовков
    if (rowIndex < (isWebAndApp ? 1 : headerDivs.length)) return;

    var row = table.insertRow();
    rowItems.forEach(function (item, cellIndex) {
      // Если мы в режиме Web and App, добавляем только первый столбец
      if (!isWebAndApp || cellIndex < 2) {
        var cell = row.insertCell();
        cell.innerHTML = item;
      }
    });
  });

  // Если мы не в режиме Web and App, добавляем пустые ячейки для остальных столбцов
  if (!isWebAndApp) {
    var rows = table.querySelectorAll("tr");
    rows.forEach(function (row) {
      while (row.cells.length < headers.length) {
        var cell = row.insertCell();
        cell.innerHTML = ""; // или '&nbsp;' для добавления неразрывного пробела
      }
    });
  }
}

// Получаем все вкладки и добавляем к ним обработчики событий
var tabs = document.querySelectorAll("#tabs div");
tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    var tabText = tab.textContent.trim();

    if (tabText === "Website") {
      updateTable(dataForWebsite);
    } else if (tabText === "Application") {
      updateTable(dataForApplication);
    } else if (tabText === "Application and Website") {
      updateTable(dataForWebAndApp);
    }

    tabs.forEach((t) => t.classList.remove("active-tab"));
    tab.classList.add("active-tab");
  });
});

// submit pop up close

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const submitButton = document.querySelector(".submit-button-pop-up");
  const openButtons = document.querySelectorAll(".button-view"); // Кнопки для открытия модального окна

  // Функция для открытия модального окна
  function openModal() {
    if (window.innerWidth <= 1200) {
      modal.style.display = "block";
      modal.style.opacity = "1";
      modal.style.transform = "scale(1)";
    }
  }

  // Функция для закрытия модального окна
  // function closeModal() {
  //   if (window.innerWidth <= 768) {
  //     modal.style.transition = "transform 0.5s, opacity 0.5s";
  //     modal.style.transform = "scale(0)";
  //     modal.style.opacity = "0";

  //     setTimeout(() => {
  //       modal.style.display = "none";
  //     }, 500);
  //   }
  // }

  // Обработчик событий для открытия модального окна
  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

});

// get started table

// document.addEventListener("DOMContentLoaded", function () {
//   // Определяем данные пакетов услуг из массива
//   const tabData = {
//     Website: [
//       {
//         title: "Basic",
//         features: [
//           "Basic website development",
//           "Pre-designed templates",
//           "Limited customization",
//           "Standard features",
//           "Ideal for small businesses",
//         ],
//         price: "$500",
//       },
//       {
//         title: "Professional",
//         features: [
//           "Custom website development",
//           "Tailored design",
//           "Enhanced features",
//           "Basic SEO optimization",
//           "Suitable for growing businesses",
//         ],
//         price: "$1000",
//       },
//       {
//         title: "Business",
//         features: [
//           "Complex website development",
//           "Highly customized solution",
//           "Advanced features",
//           "Comprehensive SEO",
//           "Designed for large corporations",
//         ],
//         price: "$5000",
//       },
//     ],
//     Application: [
//       {
//         title: "Basic",
//         features: [
//           "Basic mobile app for iOS/Android",
//           "Pre-designed app templates",
//           "Limited customization",
//           "Standard features",
//           "Ideal for individuals/small businesses",
//         ],
//         price: "$5000",
//       },
//       {
//         title: "Professional",
//         features: [
//           "Custom mobile app development",
//           "User-friendly interface design",
//           "Integration with backend services",
//           "App testing and deployment",
//           "Suitable for growing businesses",
//         ],
//         price: "$10000",
//       },
//       {
//         title: "Business",
//         features: [
//           "Complex app development",
//           "Highly customized solution",
//           "Advanced features",
//           "Testing and optimization",
//           "Designed for larger corporations and organizations",
//         ],
//         price: "$15000",
//       },
//     ],
//     "Application and Website": [
//       {
//         title: "Web and App",
//         features: [
//           "Custom website and mobile app development",
//           "Tailored design to match brand identity",
//           "User authentication, e-commerce",
//           "Comprehensive SEO, performance optimization, and app testing",
//           "Suitable for businesses requiring both web and mobile presence",
//         ],
//         price: "$5400",
//       },
//     ],
//   };

//   function getFullPackageName(shortName) {
//     // Словарь соответствия сокращений и полных названий
//     const nameMapping = {
//       Basic: "Basic",
//       Pro: "Professional",
//       Business: "Business",
//       "Application and Website": "Web and App",
//     };

//     return nameMapping[shortName] || shortName;
//   }

//   // Функция для заполнения модального окна данными выбранного пакета
//   function populateModal(packageName, category) {
//     const modal = document.querySelector(".modal");
//     const packageNameSpan = modal.querySelector(".package-name");
//     const packageFeatures = modal.querySelector(".left-section ul");

//     // Очищаем текущий список функций в модальном окне
//     while (packageFeatures.firstChild) {
//       packageFeatures.removeChild(packageFeatures.firstChild);
//     }

//     // Находим данные выбранного пакета
//     const packageData = tabData[category].find((p) => p.title === packageName);

//     if (packageData) {
//       // Устанавливаем название пакета
//       packageNameSpan.innerText = packageData.title.toUpperCase();

//       // Добавляем функции пакета
//       packageData.features.forEach((feature) => {
//         const li = document.createElement("li");
//         li.textContent = feature;
//         packageFeatures.appendChild(li);
//       });

//       // Отображаем модальное окно
//       modal.style.display = "block";
//     }
//   }

//   // Добавляем обработчики событий на кнопки в таблице
//   const tableButtons = document.querySelectorAll(
//     ".feature-service-table .button-get-started"
//   );
//   tableButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const shortPackageName = this.parentNode.querySelector("h3").innerText;
//       const category = document.querySelector(".tabs .active-tab p").innerText;
//       const fullPackageName = getFullPackageName(shortPackageName);

//       populateModal(fullPackageName, category);
//     });
//   });

//   // Обработчик для закрытия модального окна
//   const closeButton = document.querySelector(".modal .close");
//   closeButton.addEventListener("click", function () {
//     document.querySelector(".modal").style.display = "none";
//   });
// });
