// Dependencies
let remote = require('electron').remote
let dialog = remote.dialog
let fs     = require('fs')
let Mousetrap = require('mousetrap')
let app = remote.require('electron').app;

// Window elements
let closeButton = document.querySelector('#window-close')
let restoreButton = document.querySelector('#window-restore')
let maximizeButton = document.querySelector('#window-maximize')
let minimizeButton = document.querySelector('#window-minimize')
let mainWindow = remote.getCurrentWindow()

// Window buttons
let newFileButton = document.querySelector('#action-new-file')
let openFileButton = document.querySelector('#action-open-file')
let saveFileButton = document.querySelector('#action-save-file')

// Editor elements
let editorWrapper = document.querySelector('#editor-wrapper')
let editorInput = editorWrapper.querySelector('.editor-input')
let setH1button = document.querySelector('#action-editor-set-header1');
let setH2button = document.querySelector('#action-editor-set-header2');

// Contextual menu
let ctxMenu = editorWrapper.querySelector('.context-menu')
let ctxList = ctxMenu.querySelector('ul')
let ctxItem = ctxList.querySelectorAll('li')
let current = {
    file: false,
    newFile: false,
    mustSave: false,
    filePath: ''
}
