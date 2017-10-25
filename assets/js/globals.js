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
let currentFile = 'Current File';
let currentFilePath = 'Current File Path';

// Action declarations
let openFileButton = document.querySelector('#action-open-file');
let saveFileButton = document.querySelector('#action-save-file');
let editorWrapper = document.querySelector('#editor-wrapper');
let editor = editorWrapper.querySelector('.editor-input');
