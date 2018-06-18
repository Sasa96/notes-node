
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions =  {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs.command('add', 'Add a new note', {   
    title: titleOptions,
    body: bodyOptions
   

})
.command('list', 'List all notes')
.command('read', 'Read a note' ,
{
    title: titleOptions
})
.command('remove', 'Remove a note',
{
    title: titleOptions
}

)
.help()
.argv;


var command = argv._[0];


if(command === 'add')
{
    var note = notes.addNote(argv.title,argv.body);
    if(note)
    {
        console.log("Adding new note");
        notes.logNote(note);
    }
    else
    {
        console.log("Couldn't add new note as it's a duplicate");
    }

}
else if(command === 'list')
{
    
   var allNotes =  notes.getAll();
   console.log(`Printing ${allNotes.length} note(s).`)
   allNotes.forEach( (note) =>  notes.logNote(note));
  

}
else if(command === 'read')
{
    var note = notes.readNote(argv.title);
    if(note)
    {
        console.log("Reading new note");
        notes.logNote(note);
    }
    else
    {
        console.log("Couldn't read new note as it doesn't exist");
    }
  
  
}
else if (command === 'remove')
{
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}
else 
{
    console.log('Command not recognized');
}
