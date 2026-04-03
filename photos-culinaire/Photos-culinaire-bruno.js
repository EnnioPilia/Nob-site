const images = document.querySelectorAll('.carousel-track img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 2;

function update() {
  images.forEach(img => {
    img.classList.remove('active', 'left', 'right', 'left2', 'right2', 'left3', 'right3');
  });

  images[index].classList.add('active');
  images[(index - 1 + images.length) % images.length].classList.add('left');
  images[(index + 1) % images.length].classList.add('right');
  images[(index - 2 + images.length) % images.length].classList.add('left2');
  images[(index + 2) % images.length].classList.add('right2');
  images[(index - 3 + images.length) % images.length].classList.add('left3');
  images[(index + 3) % images.length].classList.add('right3');
}

prev.onclick = () => {
  index = (index - 1 + images.length) % images.length;
  update();
};

next.onclick = () => {
  index = (index + 1) % images.length;
  update();
};

function openFullscreen(image) {
  const container = document.createElement('div');
  container.className = 'fullscreen';

  const img = document.createElement('img');
  img.src = image.src;

  const closeBtn = document.createElement('img');
  closeBtn.src = '../image/croix.png';
  closeBtn.className = 'close';

  closeBtn.onclick = () => {
    container.remove();
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';

  container.append(img, closeBtn);
  document.body.appendChild(container);
}

images.forEach(img => {
  img.addEventListener('click', () => openFullscreen(img));
});

update();