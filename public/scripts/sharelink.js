// copy link
document.getElementById('copy-btn').addEventListener('click', function () {
    const text = document.getElementById('invite-url').textContent.trim();

    navigator.clipboard.writeText(text).then(() => {
        this.querySelector('span').textContent = 'Copied!';

        setTimeout(() => {
            this.querySelector('span').textContent = 'Copy Link';
        }, 2000);
    });
});

