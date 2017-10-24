// Dependencies
let remote = require('electron').remote;

// Declarations
let closeButton = document.querySelector('#window-close');
let restoreButton = document.querySelector('#window-restore');
let maximizeButton = document.querySelector('#window-maximize');
let minimizeButton = document.querySelector('#window-minimize');
let mainWindow = remote.getCurrentWindow();

// Initialization
hideInline(restoreButton)

// Events
closeButton.addEventListener('click', (e) => {
    mainWindow.close();
})

minimizeButton.addEventListener('click', (e) => {
    mainWindow.minimize();
})

maximizeButton.addEventListener('click', (e) => {
    hideInline(maximizeButton)
    showInline(restoreButton)
    mainWindow.maximize();
})

restoreButton.addEventListener('click', (e) => {
    hideInline(restoreButton)
    showInline(maximizeButton)
    mainWindow.restore();
})

dropdown('.dropdown')
generalKeyBindings(window)
generalFunctions()

let dialog = remote.require('dialog')
