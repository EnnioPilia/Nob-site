let zoomLevel = 1;

let isDragging = false;
let hasMoved = false;
let spacePressed = false;

let startX, startY;
let translateX = 0;
let translateY = 0;

let zoomedImage;
let container;

function openFullscreen(element) {
    container = document.createElement('div');
    container.className = 'fullscreen-container';

    zoomedImage = document.createElement('img');
    zoomedImage.className = 'fullscreen-image';
    zoomedImage.src = element.src;

    const closeButton = document.createElement('img');
    closeButton.src = '../image/croix.png';
    closeButton.className = 'fullscreen-close';
    closeButton.onclick = closeFullscreen;

    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Cliquez pour zoomer - Maintenez espace et glissez pour déplacer';

    container.appendChild(zoomedImage);
    container.appendChild(closeButton);
    container.appendChild(hint);

    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    zoomLevel = 1;
    translateX = 0;
    translateY = 0;

    updateTransform();

    container.addEventListener('click', function (e) {

        if (spacePressed || isDragging) return;

        if (e.target !== zoomedImage) {
            if (zoomLevel !== 3.5) return;
        }

        if (hasMoved) {
            hasMoved = false;
            return;
        }

        const rect = zoomedImage.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let oldZoom = zoomLevel;

        if (zoomLevel === 1) {
            zoomLevel = 3.5;
        } else {
            zoomLevel = 1;
            translateX = 0;
            translateY = 0;
        }

        const hint = container.querySelector('.hint');
        if (hint) {
            if (zoomLevel > 1) {
                hint.style.opacity = '0';
            } else {
                hint.style.opacity = '1';
            }
        }

        if (zoomLevel > 1) {
            const scaleFactor = zoomLevel / oldZoom;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const offsetX = clickX - centerX;
            const offsetY = clickY - centerY;

            translateX -= offsetX * (scaleFactor - 1);
            translateY -= offsetY * (scaleFactor - 1);
        }

        container.classList.remove('zoomed', 'max-zoom');

        if (zoomLevel === 3.5) {
            container.classList.add('zoomed');
            container.classList.add('max-zoom');
        }
        updateTransform();
    });

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', drag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        spacePressed = true;
        if (container) container.classList.add('space-active');
    }
});

document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        spacePressed = false;
        if (container) container.classList.remove('space-active');
    }
});

function startDrag(e) {
    if (zoomLevel === 1 || !spacePressed) return;

    isDragging = true;
    hasMoved = false;

    startX = e.clientX - translateX;
    startY = e.clientY - translateY;

    container.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    hasMoved = true;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    updateTransform();
}

function endDrag() {
    isDragging = false;

    if (container) container.classList.remove('dragging');

    setTimeout(() => {
        hasMoved = false;
    }, 0);
}

function updateTransform() {
    zoomedImage.style.transform =
        `scale(${zoomLevel}) translate(${translateX / zoomLevel}px, ${translateY / zoomLevel}px)`;
}

function closeFullscreen() {
    if (container) {
        container.remove();
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('.photo-container img').forEach(img => {
    img.addEventListener('click', function () {
        openFullscreen(this);
    });
});