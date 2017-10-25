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


openFileButton.addEventListener('click', e => {
    hideToolbarLists();

    dialog.showOpenDialog({
        filters: [
            { name: 'Markdown files', extensions: ['md', 'MD'] }
        ]
    }, (filePath) => {
        currentFilePath = filePath[0];
        if (typeof filePath == 'object') {
            fs.readFile(filePath[0], 'utf8', (err, file) => {
                if (err) return console.log(err.message);
                console.log('There wasn\'t errors');
                editor.innerHTML = file;
            })
        }
    })
})

saveFileButton.addEventListener('click', e => {
    hideToolbarLists();
    fs.writeFile(currentFilePath, editor.innerHTML, err => {
        if (err) return err.message;
        console.log('Saved!');
    })
})

editorWrapper.addEventListener('click', (e) => {
    hideToolbarLists();
})
