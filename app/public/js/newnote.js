// const notes = require ('./notes');

title = document.getElementById("title");
desc = document.getElementById("desc"); 
//getting query string value for id
id = getQueryValue("id");
function getQueryValue(queryString){
  var urlParams = new URLSearchParams(window.location.search);
      return parseInt(urlParams.get(queryString));
}

deleteBtn = document.getElementById('deleteBtn');
// Read note if exist
if(!id){
 deleteBtn.style.display = 'none';
}
else{
    readNote()
}
async function readNote(){
  let response = await fetch(`/notes/reade?id=`+id);
  note = await response.json();
  title.value = note.title;
  desc.value = note.body;
}
// delet note
function deleteNote(){
  var r = confirm("Are you sure! to delete");
  if (r == true) {
    removeNote()
    window.location.href = '/';
  }
}
async function removeNote(){
  let response = await fetch(`/notes/delete?id=`+id);
  note = await response.json();
}
// add new note 
function onSave(){
  if(!title.value)
     return 0;
  if(!id){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/notes/add', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: title.value,
        body: desc.value
    }));
  }
  else{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/notes/update', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id,
        title: title.value,
        body: desc.value
    }));
  }
   window.location.href = '/';
}


