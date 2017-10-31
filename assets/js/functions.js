// Functions
let hideInline = (element) => {
    element.style.display = 'none'
}

let showInline = (element) => {
    element.style.display = 'inline-block'
}

let showBlock = (element) => {
    element.style.display = 'block'
}

let hideToolbarLists = () => {
    let lists = document.querySelectorAll('.dropdown-list')
    ctxMenu.style.transform = 'scale(0)'
    for (var i = 0; i < lists.length; i++) {
        let list = lists[i]
        list.style.display = 'none'
    }
}

let dropdown = (elementClass) => {
    let triggers = document.querySelectorAll(elementClass)

    for (var i = 0; i < triggers.length; i++) {
        let trigger = triggers[i]
        let listId  = trigger.getAttribute('data-toggles')
        let list    = document.querySelector('#' + listId)
        let listItem= list.querySelector('li.list-item')
        list.style.display = 'none'

        trigger.addEventListener('click', (e) => {
            hideToolbarLists()
            list.style.display = 'block'
            e.stopPropagation();
        })
    }
}

let generalKeyBindings = (window) => {
    window.addEventListener('keyup', (e) => {
        // Shortcuts
        e.preventDefault()

        // Combinations
        if (e.ctrlKey) {
            switch (e.keyCode) {
                case 83:
                    fs.writeFile(currentFilePath, editor.innerHTML, err => {
                        if (err) return err.message;
                        console.log('Saved!');
                    })
                    break;
            }
        }else{
            switch (e.keyCode) {
                case 27:
                    hideToolbarLists()
                    break;
            }
        }
    })
}

let generalFunctions = () => {
    // Hide when click on toolbar item
    let items = document.querySelectorAll('.list-item')
    for (var i = 0; i < items.length; i++) {
        let item = items[i]
        item.addEventListener('click', () => {
            hideToolbarLists()
        })
    }
}


let parseFile = (div, content) => {
    let rules = JSON.parse(fs.readFileSync(app.getAppPath() + '/assets/js/regex-formats.json').toString());
    let newcontent = content;
    console.log(rules);
    for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        newcontent = newcontent.replace(new RegExp(rule.regex, 'gim'), rule.result);
    }
    div.innerHTML = newcontent
}

let openFile = () => {
    dialog.showOpenDialog({
        filters: [
            { name: 'Markdown files', extensions: ['md', 'MD'] }
        ]
    }, (filePath) => {
        if (typeof filePath == 'object') {
            current.file = true
            current.newFile = false
            current.filePath = filePath[0]
            current.content = fs.readFileSync(filePath[0]).toString();
            console.log(parseFile(editorInput, current.content));
            //
            // let recentFiles = storage.getRecentFiles();
            // let mustBeAdded = true;
            // console.log('Recent files', recentFiles);
            // for (var i = 0; i < recentFiles.length; i++) {
            //     if (current.filePath == recentFiles[i].path) {
            //         mustBeAdded = false;
            //     }
            // }
            //
            // if (mustBeAdded) {
            //     storage.addRecentFile(current.filePath)
            // }
        }
    })
}

let checkForSave = () => {
    if (current.mustSave) {
        console.log('Debe guardar?', current.mustSave);
        if(confirm('Hay cambios no guardados.\nContinuar?')) return true;
        return false;
    }
    return true;
}

let openRecent = (path) => {
    if (checkForSave()) {
        current.file = true
        current.newFile = false
        current.filePath = path
        current.mustSave = false
        current.content = fs.readFileSync(path).toString();
        console.log(current.content);
        editorInput.innerHTML = parseFile(editorInput, current.content);
    }
}

let reOpenFile = () => {
    if (current.file) {
        console.log('Reopening',current.filePath);
        // let content = fs.readFileSync(current.filePath).toString().split(/(\r\n|\n|\r)/gm).filter(Boolean)
        parseFile(editorInput, current.content)
    }
}

let saveFile = () => {
    if (!current.file) return console.log('No hay archivos abiertos');
    if (!current.newFile) {
        if (!current.mustSave) return console.log('No hay cambios que guardar');
        let content = editorInput.innerHTML.replace(/<\/div><div>/g,' ').replace(/<div>/g,'').replace(/<\/div>/g,'')
        fs.writeFileSync(current.filePath, content, err => {
            if (err) return console.log(err.message);
            console.log('Saved!');
        })
    }else{
        let newFile = dialog.showSaveDialog({ defaultPath: current.filePath })
        current.file = true
        current.filePath = newFile
        current.mustSave = false
        current.newFile = false
        let content = editorInput.innerHTML.replace(/<\/div><div>/g,' ').replace(/<div>/g,'').replace(/<\/div>/g,'')
        fs.writeFileSync(newFile, content, err => {
            if (err) return console.log(err.message)
            console.log('New file saved!')
        })
    }
}


let appendRecentFiles = (items) => {
    let header = document.querySelector('#recentFiles')
    let container = header.parentNode
    header = document.querySelector('#recentFiles + ul')

    if (items.length !== 0) {
        for (var i = 0; i < items.length; i++) {
            items[i]
            let recentFile = document.createElement('li')
            recentFile.classList = 'context-list-item'
            recentFile.innerHTML = items[i].name
            recentFile.setAttribute('onclick', 'openRecent("' + items[i].path + '")')
            container.insertBefore(recentFile, header)
        }
    }else{
        let item = document.createElement('li')
        item.classList = 'context-list-item'
        item.innerHTML = 'No hay archivos recientes.'
        container.insertBefore(item, header)
    }


}

// appendRecentFiles(storage.getRecentFiles())
