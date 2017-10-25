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

let replaceWithElement = (element, char, string) => {
    return '<' + element + '>' + string.replace(char,'') + '</' + element + '>' + '<br>';
}

let isChar = (string, position, char) => {
    if ( string.charAt(position) === char ) return true
    return false
}

let parseReturn = (lineArray) => {
    let result = '';
    for (var i = 0; i < lineArray.length; i++) {
        let k = i + 1;
        if (lineArray[i] !== "\n"){
            let line = lineArray[i];
            let orig = line;
            line = line.replace(/[\*]{2}(.*)[\*]{2}/g, "<b>$1</b>")
            line = line.replace(/[__]{2}(.*)[__]{2}/g, "<b>$1</b>")
            line = line.replace(/\*(.*)\*/g, "<i>$1</i>")
            line = line.replace(/_(.*)_/g, "<i>$1</i>")
            line = line.replace(/[#]{6}(.*)/g, "<h6>$1</h6>")
            line = line.replace(/[#]{5}(.*)/g, "<h5>$1</h5>")
            line = line.replace(/[#]{4}(.*)/g, "<h4>$1</h4>")
            line = line.replace(/[#]{3}(.*)/g, "<h3>$1</h3>")
            line = line.replace(/[#]{2}(.*)/g, "<h2>$1</h2>")
            line = line.replace(/[#]{1}(.*)/g, "<h1>$1</h1>")
            line = line.replace(/[~]{2}(.*)[~]{2}/g, "<u>$1</u>")
            console.log('-===================-');
            console.log(orig);
            console.log(line + '<br>');
            console.log('-===================-');
            result += line + '<br>'
        } else if (lineArray[i] == "\n" && lineArray.length >= k && lineArray[k] == "\n"){
            result += '<br>';
            i++
        }
    }
    console.log(result);
    return result;
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
            let content = fs.readFileSync(filePath[0]).toString().split(/(\r\n|\n|\r)/gm).filter(Boolean)
            editorInput.innerHTML = parseReturn(content);
        }
    })
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
