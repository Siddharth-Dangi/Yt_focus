function createToggleButton() {
    const button = document.createElement('button');
    button.textContent = 'Toggle';
    button.id = 'focus-button';
    document.querySelector('#below').prepend(button);

    let overlay = null;

    button.addEventListener('click', () => {
        const player = document.getElementById('player');
        const rect = player.getBoundingClientRect();

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'yt-focus-overlay';
            overlay.style.clipPath = `polygon(
                0% 0%, 100% 0%, 100% ${rect.top}px, 
                0% ${rect.top}px,
                0% ${rect.bottom}px, 100% ${rect.bottom}px,
                100% 100%, 0% 100%
            )`;

            document.body.appendChild(overlay);
            button.textContent = 'Exit';
        } else {
            overlay.remove();
            overlay = null;
            button.textContent = 'Toggle';
        }
    });
}

// Block Shorts across YouTube
const style = document.createElement('style');
style.textContent = `
  ytd-reel-shelf-renderer,
  ytd-reel-item-renderer,
  a[href*="/shorts"],
  ytd-reel-video-renderer {
    display: none !important;
  }
`;
document.head.appendChild(style);

//  Run only on normal videos
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
