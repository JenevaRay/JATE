const butInstall = document.getElementById('buttonInstall');
butInstall.style.display = 'none'

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    butInstall.style.display = 'block'
    window.deferredPrompt = event
});

butInstall.addEventListener('click', async () => {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt()
        window.deferredPrompt = null
    } else {
        console.log("Install button clicked, but not PWA yet!")
    }
});

window.addEventListener('appinstalled', (event) => {
    console.log("App installed!")
    butInstall.style.display = 'none'
});
