
window.addEventListener('scroll', function() {
    const header = document.getElementById('staticHeader');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

const button = document.querySelector('.button');

button.addEventListener('click', function() {
    this.classList.add('pressed');
});



// Функция обратного вызова для первого наблюдателя
function handleIntersectionFirst(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.first-line').classList.add('animate-first');
            entry.target.querySelector('.second-line').classList.add('animate-second');
            observer.unobserve(entry.target); // Прекратить наблюдение
        }
    });
}

// Функция обратного вызова для второго наблюдателя
function handleIntersectionSecond(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Прекратить наблюдение за этим элементом, так как анимация уже произошла
        }
    });
}

// Настройки для наблюдателей
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Создаем первый наблюдатель для контейнера
const observerForContainer = new IntersectionObserver(handleIntersectionFirst, observerOptions);
const container = document.querySelector('.container-animation-text');
observerForContainer.observe(container);

// Создаем второй наблюдатель для ячеек
const observerForCells = new IntersectionObserver(handleIntersectionSecond, observerOptions);
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    observerForCells.observe(cell);
});




