const fs = require('fs');

const getAllNotes =  () => {
    const notes = loadNotes();
    return notes;
}
const addNote = (title,body) => {
    const notes = loadNotes();
    const id = newNoteId = Math.max(...notes.map(note => parseInt(note.id)), 0) + 1;
    notes.push({id,title,body});
    saveData(notes);
    return true;
}
const updateNote = (id,title,body)=>{
    const notes = loadNotes();
    const updated = notes.map(note=>{
        if(note.id == id){
         note.title = title;
         note.body = body;
        }
        return note
    });
    saveData(updated);
}
const  removeNote =  (id) => {
    const notes = loadNotes();
    // const index = notes.findIndex(note=> note.id === id);
    const filteredNotes = notes.filter(note=>note.id != id)
   if(notes.length != filteredNotes.length){
       // notes.splice(index,1);
       saveData(filteredNotes);
       return {status : 200};
   }
   return {error : "Error "};
}
const  readNote = function (id) {
    const notes = loadNotes();
    const targetNote = notes.find(note => note.id === id);
    if(!targetNote){
        return{title:"Not Found",body:""}
    }
    return targetNote;
}

const saveData =  (notes) => {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync('app/notes_data.json',notesJson)
}
const loadNotes =  () => {
    try{
        const notesArr = fs.readFileSync('app/notes_data.json','utf-8');
        return JSON.parse(notesArr);
    } catch(e){
        return [];
    }
}
module.exports ={
    getAllNotes:getAllNotes,
    addNote:addNote,
    removeNote:removeNote,
    readNote:readNote,
    updateNote:updateNote
};
// module.exports = getNotes(); return what function return
// module.exports = getNotes; return what function itselfe

