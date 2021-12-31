const yargs = require('yargs')
const notes = require('./notes')

// console.log(process.argv) 
yargs.version('1.1.0')

// add remove list read
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }, body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.lisNotes();
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title to be read',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})


yargs.parse();
// console.log(yargs.argv)