let fullscreenMode = false;
let hoverMode = false;
let container = null;

function openFullscreen(element) {

    closeFullscreen();

    container = document.createElement('div');
    container.className = 'fullscreen-container';
    
    const img = document.createElement('img');
    img.className = 'fullscreen-image';
    img.src = element.src;

    const close = document.createElement('img');
    close.src = '../image/croix.png';
    close.className = 'close';
    close.onclick = closeFullscreen;

    container.appendChild(img);
    container.appendChild(close);

    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    document.querySelector('.slider').style.animationPlayState = 'paused';

    fullscreenMode = true;
}

function closeFullscreen() {
    if (container) {
        container.remove();
        container = null;
        document.body.style.overflow = '';

        if (!hoverMode) {
            document.querySelector('.slider').style.animationPlayState = 'running';
        }

        fullscreenMode = false;
    }
}

document.querySelectorAll('.slider span img').forEach(img => {

    img.addEventListener('click', () => openFullscreen(img));

    img.addEventListener('mouseenter', () => {
        hoverMode = true;
        if (!fullscreenMode) {
            document.querySelector('.slider').style.animationPlayState = 'paused';
        }
    });

    img.addEventListener('mouseleave', () => {
        hoverMode = false;
        if (!fullscreenMode) {
            document.querySelector('.slider').style.animationPlayState = 'running';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFullscreen();
});