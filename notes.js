const fs = require('fs');
const chalk = require('chalk')

// Add Note
const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)


    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bold.bgGreen('Added successfully'))
    } else {
        console.log(chalk.bold.bgRed('Note title already taken'))
    }
}

// remove Note
const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep)
        console.log(chalk.bold.bgGreen('Note successfully deleted!'))
    } else {
        console.log(chalk.bold.bgRed('Note does not exist!'))
    }

}

//List notes
const lisNotes = () => {

    const notes = loadNotes()

    if (notes.length < 0) {
        console.log(chalk.bold.red('No notes found!'))
    } else {
        console.log(chalk.bold.underline.inverse('Your Notes'))
        notes.forEach((note) => {
            console.log(chalk.bold.cyan(note.title))
        })
    }
}

//Read a note
const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.bold.inverse(note.title))
        console.log(chalk.bold.inverse(note.body))

    } else {
        console.log(chalk.bold.red('No notes found with given title!'))
    }
}

//Util Functions
//save Notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// load all Notes
const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        return []
    }
}


module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    lisNotes: lisNotes,
    readNotes: readNotes
}