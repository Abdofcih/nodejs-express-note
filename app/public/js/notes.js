const noNotes = document.getElementById('noNotes')
const result = document.getElementById('result');
 async function  getAllNotes(){
   var notes = [];
   var notes = [];
   var html = "";
   let response = await fetch('/notes');
   notes = await response.json();
   if(notes.length === 0)
   noNotes.innerHTML = "No Notes yet";
   else{
    for(j=0; j<notes.length;j++){
     html +=   `<div class="note" onclick="redirect('new?id=' + ${notes[j].id})">
             ${notes[j].title}
         </div>`;
    }
    result.innerHTML = html;
   }
   return notes;
}

getAllNotes();