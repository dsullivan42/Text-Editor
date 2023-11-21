const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // console log's the event and prevents the default action
    console.log('click', 'beforeinstallprompt', event);
    event.preventDefault();
    // sets the window.deferredPrompt to the event
    window.deferredPrompt = event;
    // removes the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // console log's the event and the window.deferredPrompt
    console.log('click', 'butInstall', window.deferredPrompt);
    const promptEvent = window.deferredPrompt;
    // checks if the promptEvent exists
    if (!promptEvent) {
        // returns if the promptEvent doesn't exist
        return;
    }
    // waits for the promptEvent to prompt
    promptEvent.prompt();
    //sets the window.deferredPrompt to null
    window.deferredPrompt = null;
    // sets the hidden class to the button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // console log's the event
    console.log('appinstalled', event);
    // sets the window.deferredPrompt to null
    window.deferredPrompt = null;
    // sets the hidden class to the button
    butInstall.classList.toggle('hidden', true);
});
