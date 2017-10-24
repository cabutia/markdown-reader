// Dependencies
let remote = require('electron').remote;
let dialog = remote.require('dialog');

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

// Action declarations
let openFileButton = document.querySelector('#action-open-file');

openFileButton.addEventListener('click', () => {
    dialog.showOpenDialog(filename => {
        console.log(filename);
    })
})
