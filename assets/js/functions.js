// Functions
let hideInline = (element) => {
    element.style.display = 'none'
}

let showInline = (element) => {
    element.style.display = 'inline-block'
}

let hideToolbarLists = () => {
    let lists = document.querySelectorAll('.dropdown-list')
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
