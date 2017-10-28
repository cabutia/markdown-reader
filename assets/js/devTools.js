// const app = remote.require('electron').app;

// Devtools declarations
let logCurrentButton = document.querySelector('#devaction-log-current')
let logContentButton = document.querySelector('#devaction-log-content')
let logAppPathButton = document.querySelector('#devaction-log-apppath')
let logAppTestButton = document.querySelector('#devaction-log-apptest')
let fileReloadButton = document.querySelector('#devaction-file-reload')


// Devtools actions
logCurrentButton.addEventListener('click', e => {
    console.log(current)
})

logContentButton.addEventListener('click', e => {
    console.log(editorInput.innerHTML);
})

logAppPathButton.addEventListener('click', e => {
    console.log(app.getAppPath());
})

logAppTestButton.addEventListener('click', e => {
    let content = editorInput.innerHTML;
    console.log(content);
    let sanitized = content.replace(/<\/div><div>/g,' ').replace(/<div>/g,'').replace(/<\/div>/g,'')
})

fileReloadButton.addEventListener('click', e => {
    reOpenFile();
})
