
//module.exports.age = 25;
const fs = require('fs');

var fetchNotes = () =>
{
    try {
        var notesString =fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e)
    {
        return [];
    }
   
};
var logNote = (note)=>
{
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

var saveNotes = (notes) => 

{ 
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));  

};

var addNote = (title, body) => {
   var notes = fetchNotes();
   var note = {
       title,
       body
     }; 

     var duplicateNotes = notes.filter((note) =>
     //  {   return note.title === title;}
          note.title === title
      );
  
      if(duplicateNotes.length ===0)
      {
          notes.push(note);
          saveNotes(notes);
          return note;
      }
    
};

var readNote = (title) => 
{
    var notes = fetchNotes();
    var wantedNote = notes.filter( (note) => note.title===title);
    return wantedNote[0];
}

var removeNote = (title) => 
{
   var notes = fetchNotes();
   var FilteredNotes = notes.filter((note) => note.title != title);

   saveNotes(FilteredNotes);

   return notes.length !== FilteredNotes.length;

}

var getAll = () => {
    return fetchNotes();
};



module.exports = {
   // addNote: addNote
   addNote,
   readNote,
   removeNote,
   getAll,
   logNote
}

