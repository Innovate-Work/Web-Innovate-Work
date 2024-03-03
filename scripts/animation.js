const onEntry = (entry) => {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

const options = { threshold: [0.5] };
const observer = new IntersectionObserver(onEntry, options);
const elements = document.querySelectorAll('[class*="animated-"]');


for (const elm of elements) {
  observer.observe(elm);
}