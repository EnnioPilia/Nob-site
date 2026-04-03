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
    close.className = 'fullscreen-close';
    close.onclick = closeFullscreen;

    container.appendChild(img);
    container.appendChild(close);

    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    container.addEventListener('click', (e) => {
        if (e.target === container) closeFullscreen();
    });
}

function closeFullscreen() {
    if (container) {
        container.remove();
        container = null;
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('.portraits-grid img').forEach(img => {
    img.addEventListener('click', () => openFullscreen(img));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFullscreen();
});