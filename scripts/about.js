// меняем положение элементов в секции about
const aboutImage = document.querySelector(".about-image");
const aboutSectionContaier = document.querySelector("#about-section-container");
const aboutImageWrapper = document.querySelector(".about-image-wrapper");

const changeHtmlStructureByScreenWidth = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    aboutImageWrapper.appendChild(aboutImage);
  } else if (screenWidth >= 768) {
    aboutSectionContaier.insertBefore(
      aboutImage,
      aboutSectionContaier.firstChild
    );
  }
};

changeHtmlStructureByScreenWidth();

window.addEventListener("resize", () => {
  changeHtmlStructureByScreenWidth();
});

// код Артема ниже ...

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

// блядство которое ломало всю верстку ...

// function rearrangeElements() {
//   const container = document.querySelector('.container');
//   const aboutImage = document.querySelector('.about-image');
//   const aboutContent = document.querySelector('.about-content');
//   const aboutHeading = document.querySelector('.about-heading');
//   const textbox = document.querySelector('.textbox');
//   const textbox2 = document.querySelector('.textbox2');

//   if (window.innerWidth <= 576) {
//       // Для экранов шириной до 578px
//       container.appendChild(aboutHeading);
//       container.appendChild(textbox2);
//       container.appendChild(aboutImage);
//       container.appendChild(textbox);
//   } else {
//       // Для экранов шириной более 578px
//       aboutContent.insertBefore(aboutHeading, aboutContent.firstChild);
//       aboutContent.appendChild(textbox);
//       aboutContent.appendChild(textbox2);
//       container.insertBefore(aboutImage, aboutContent);
//   }
// }

// // Вызов функции при загрузке страницы
// window.addEventListener('load', rearrangeElements);



// animation

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    threshold: 0.05, // Элемент должен быть видим на 10% перед активацией анимации
    rootMargin: "0px"
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Добавляем класс для начала анимации
        entry.target.classList.add('animate-visible');
        // Отменяем наблюдение после начала анимации
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Добавляем элементы для наблюдения
  const elementsToAnimate = document.querySelectorAll('.about-heading, .textbox, .textbox2, .framing-line, .cell-1, .cell-2, .cell-3, .cell-4, .cell-5');
  elementsToAnimate.forEach(el => observer.observe(el));
});

