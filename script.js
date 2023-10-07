
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

