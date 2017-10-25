// Dependencies
let remote = require('electron').remote
let dialog = remote.dialog
let fs     = require('fs')

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
let editorWrapper = document.querySelector('#editor-wrapper');

openFileButton.addEventListener('click', (e) => {
    hideToolbarLists();

    dialog.showOpenDialog({
        filters: [
            { name: 'Markdown files', extensions: ['md', 'MD'] }
        ]
    }, (filePath) => {
        if (typeof filePath == 'object') {
            fs.readFile(filePath[0], 'utf-8', (err, file) => {
                if (err) return console.log(err);

                console.log('There wasn\'t errors', file);
            })
        }
    })
})

editorWrapper.addEventListener('click', (e) => {
    hideToolbarLists();
})
