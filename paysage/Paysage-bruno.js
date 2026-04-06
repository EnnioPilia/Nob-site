const scenes = document.querySelectorAll('.scene');
const firstScene = document.querySelector('.scene.first');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.target.classList.contains('first')) return;

        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.4 });

scenes.forEach(scene => observer.observe(scene));

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        firstScene.classList.add('visible');
    } else {
        firstScene.classList.remove('visible');
    }
});

const images = document.querySelectorAll('.scene img');

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