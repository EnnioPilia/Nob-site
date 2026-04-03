const images = document.querySelectorAll('.grid img');

images.forEach((img) => {
  img.addEventListener('click', () => openFullscreen(img));
});

function openFullscreen(image) {
  const container = document.createElement('div');
  container.className = 'fullscreen';

  const img = document.createElement('img');
  img.src = image.src;

  const close = document.createElement('img');
  close.src = '../image/croix.png';
  close.className = 'close';

  close.onclick = () => container.remove();

  container.append(img, close);
  document.body.appendChild(container);
}