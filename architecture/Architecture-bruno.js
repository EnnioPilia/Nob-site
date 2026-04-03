document.querySelectorAll('.slider-container').forEach(container => {

  const images = container.querySelectorAll('.slider img');
  const prev = container.querySelector('.prev');
  const next = container.querySelector('.next');

  let index = 0;

  function show(i) {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  }

  prev.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    show(index);
  });

  next.addEventListener('click', () => {
    index = (index + 1) % images.length;
    show(index);
  });

  images.forEach((img, i) => {
    img.addEventListener('click', () => openFullscreen(images, i));
  });

  show(index);
});

function openFullscreen(images, index) {

  const imgs = [...images]; 

  const container = document.createElement('div');
  container.className = 'fullscreen';

  const img = document.createElement('img');
  img.className = 'main';

  const close = document.createElement('img');
  close.src = '../image/croix.png';
  close.className = 'close';

  const prev = document.createElement('img');
  prev.src = '../image/fleche-carousel-gauche2.png';
  prev.className = 'fs-prev';

  const next = document.createElement('img');
  next.src = '../image/fleche-carousel-droite2.png';
  next.className = 'fs-next';

  function update() {
    img.src = imgs[index].src;
  }

  prev.onclick = () => {
    index = (index - 1 + imgs.length) % imgs.length;
    update();
  };

  next.onclick = () => {
    index = (index + 1) % imgs.length;
    update();
  };

  close.onclick = () => container.remove();

  update();
  container.append(img, close, prev, next);
  document.body.appendChild(container);
}