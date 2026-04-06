const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider span img');

let container = null;
let fullscreenMode = false;
let hoverMode = false;

function openFullscreen(imgElement) {
    closeFullscreen();

    container = document.createElement('div');
    container.className = 'fullscreen-container';

    const img = document.createElement('img');
    img.src = imgElement.src;
    img.className = 'fullscreen-image';

    const close = document.createElement('img');
    close.src = '../image/croix.png';
    close.className = 'close';
    close.addEventListener('click', closeFullscreen);

    container.appendChild(img);
    container.appendChild(close);

    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    slider.style.animationPlayState = 'paused';
    fullscreenMode = true;
}

function closeFullscreen() {
    if (!container) return;

    container.remove();
    container = null;

    document.body.style.overflow = '';

    if (!hoverMode) {
        slider.style.animationPlayState = 'running';
    }

    fullscreenMode = false;
}

images.forEach(img => {

    img.addEventListener('click', () => openFullscreen(img));

    img.addEventListener('mouseenter', () => {
        hoverMode = true;
        if (!fullscreenMode) slider.style.animationPlayState = 'paused';
    });

    img.addEventListener('mouseleave', () => {
        hoverMode = false;
        if (!fullscreenMode) slider.style.animationPlayState = 'running';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFullscreen();
});