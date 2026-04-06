const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

function handleScroll() {
  const scroll = window.scrollY;
  const trigger = window.innerHeight * 0.9;

  const progress = Math.min(scroll / trigger, 1);

  header.style.background = `rgba(255,255,255,${progress})`;
  hero.style.background = `rgba(0,0,0,${1 - progress})`;
}

window.addEventListener('scroll', handleScroll);