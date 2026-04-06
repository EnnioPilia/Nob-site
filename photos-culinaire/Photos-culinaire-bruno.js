const images = document.querySelectorAll('.carousel-track img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function update() {
  images.forEach(img =>
    img.className = ''
  );

  images[index].classList.add('active');
  images[(index - 1 + images.length) % images.length].classList.add('left');
  images[(index + 1) % images.length].classList.add('right');
  images[(index - 2 + images.length) % images.length].classList.add('left2');
  images[(index + 2) % images.length].classList.add('right2');
  images[(index - 3 + images.length) % images.length].classList.add('left3');
  images[(index + 3) % images.length].classList.add('right3');
}

prev.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  update();
});

next.addEventListener('click', () => {
  index = (index + 1) % images.length;
  update();
});

function openFullscreen(image) {
  const container = document.createElement('div');
  container.className = 'fullscreen';

  const img = document.createElement('img');
  img.src = image.src;

  const close = document.createElement('img');
  close.src = '../image/croix.png';
  close.className = 'close';

  close.addEventListener('click', () => {
    container.remove();
    document.body.style.overflow = '';
  });

  container.append(img, close);
  document.body.appendChild(container);
  document.body.style.overflow = 'hidden';
}

images.forEach(img => {
  img.addEventListener('click', () => openFullscreen(img));
});

update();