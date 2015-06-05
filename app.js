// add note
function addNoteToList(note,id) {
  $('#show-notes').prepend("<li><div class='edit' id='"+id+"'>"+note+"</div><a href='#' class='edit'>Edit</a></li>");
  $("#"+id).editable("click",function(note,settings){
      console.log(this);
      console.log(note);
      notes[id] = note.value;
       localStorage['notes'] = JSON.stringify(notes);
      console.log(notes, id);
      return(note);
    });
}

if (localStorage['notes']) {
  var notes = JSON.parse(localStorage[
    'notes']);
} else {
  var notes = [];
}

for (var i=0; i < notes.length; i++) {
  addNoteToList(notes[i],i);
}

var addNote = function() {
  // get value from note input
  var noteValue = $('#note').val();

  // add note to array
  notes.push(noteValue);

  // save to localStorage
  localStorage['notes'] = JSON.stringify(notes);

  // append note to addNoteToList
  addNoteToList(noteValue,notes.length-1);

  // clear input field
  $('#note').val('').focus();
}

$('#submit').click(addNote);
$('#note').keyup(function(event){
  if (event.keyCode === 13) {
    addNote();
  }
});






