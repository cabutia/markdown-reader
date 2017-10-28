// Initialization
hideInline(restoreButton)

// Events
closeButton.addEventListener('click', (e) => {
    mainWindow.close()
})

minimizeButton.addEventListener('click', (e) => {
    mainWindow.minimize()
})

maximizeButton.addEventListener('click', (e) => {
    hideInline(maximizeButton)
    showInline(restoreButton)
    mainWindow.maximize()
})

restoreButton.addEventListener('click', (e) => {
    hideInline(restoreButton)
    showInline(maximizeButton)
    mainWindow.restore()
})

dropdown('.dropdown')
generalFunctions()
// Action declarations
editorInput.addEventListener('input', (e) => {
    if (!current.mustSave) {
        current.mustSave = true
    }
})

newFileButton.addEventListener('click', e => {
    hideToolbarLists()
    current.file = true
    current.newFile = true;
    current.filePath = app.getAppPath()
    editorInput.innerHTML = '';
})

openFileButton.addEventListener('click', e => {
    hideToolbarLists()
    openFile()
})

saveFileButton.addEventListener('click', e => {
    hideToolbarLists()
    saveFile()
})

editorWrapper.addEventListener('click', (e) => {
    hideToolbarLists()
})


// Context menu
editorWrapper.addEventListener('contextmenu', e => {
    e.preventDefault()
    console.log('Position', e.offsetX + ':' + e.offsetY);
    ctxMenu.style.left = (e.offsetX - 150) + 'px';
    ctxMenu.style.top = e.offsetY + 'px';
    ctxMenu.style.transform = 'scale(1)';
})

storage.getRecentFiles();
