const butInstall = document.getElementById('buttonInstall');
butInstall.style.display = 'none'

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    butInstall.style.display = 'block'
    window.deferredPrompt = event
    // showInAppInstallPromotion()
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt()
        window.deferredPrompt = null
    } else {
        console.log("Install button clicked, but not PWA yet!")
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("App installed!")
    butInstall.style.display = 'none'
});
