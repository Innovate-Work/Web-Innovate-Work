
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



// Функция обратного вызова для наблюдателя
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Прекратить наблюдение за этим элементом, так как анимация уже произошла
        }
    });
}

// Создаем наблюдатель
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // начать когда хотя бы 10% элемента видны
});

// Начнем наблюдение за каждой ячейкой
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    observer.observe(cell);
});

