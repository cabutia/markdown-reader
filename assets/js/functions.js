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
        switch (e.keyCode) {
            case 27:
                hideToolbarLists()
                break;
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
    for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        newcontent = newcontent.replace(new RegExp(rule.regex, 'gim'), rule.result);
        /*
            Ni la linea de arriba, ni la de abajo, comienzan con numeros
            (?!^[0-9]\. *$)\n^[0-9]\. (.*)$\n(?!^[0-9]\. *$)
        */
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
            let content = fs.readFileSync(filePath[0]).toString();
            console.log(content);
            parseFile(editorInput, content);
        }
    })
}

let reOpenFile = () => {
    if (current.file) {
        console.log('Reopening',current.filePath);
        let content = fs.readFileSync(current.filePath).toString().split(/(\r\n|\n|\r)/gm).filter(Boolean)
        editorInput.innerHTML = parseReturn(content);
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
        let newFile = dialog.showSaveDialog({ defaultPath: current.filePath, })
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
