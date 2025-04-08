function createToggleButton() {
    const button = document.createElement('button');
    button.textContent = 'Toggle';
    button.id = 'focus-button';
    document.querySelector('#below').prepend(button);

    let overlay = null;

    button.addEventListener('click', () => {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'yt-focus-overlay';
            document.body.appendChild(overlay);
            button.textContent = 'Exit';
        } else {
            overlay.remove();
            overlay = null;
            button.textContent = 'Toggle';
        }
    });
}

if (window.location.href.includes('/watch')) {
    const checkExist = setInterval(() => {
        const container = document.getElementById('player');
        const buttonArea = document.querySelector('#below');
        if (container && buttonArea) {
            clearInterval(checkExist);
            createToggleButton();
        }
    }, 500);
}
