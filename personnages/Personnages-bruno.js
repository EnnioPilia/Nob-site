const images = document.querySelectorAll('.grid img');

images.forEach((img) => {
  img.addEventListener('click', () => openFullscreen(img));
});

function openFullscreen(image) {
  const container = document.createElement('div');
  container.className = 'fullscreen';

  document.body.style.overflow = 'hidden'; 

  const img = document.createElement('img');
  img.src = image.src;
  img.className = 'main';

  const close = document.createElement('img');
  close.src = '../image/croix.png';
  close.className = 'close';

  close.onclick = () => {
    container.remove();
    document.body.style.overflow = ''; 
  };

  container.append(img, close);
  document.body.appendChild(container);
}