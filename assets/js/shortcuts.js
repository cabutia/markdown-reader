Mousetrap.bind(['ctrl+s', 'command+s'], () => {
    if (!current.file) return console.log('No hay archivos abiertos');
    if (!current.mustSave) return console.log('No hay cambios que guardar');
    fs.writeFileSync(current.filePath, editorInput.innerHTML, err => {
        if (err) return console.log(err.message);
        console.log('Saved!');
    })
})
