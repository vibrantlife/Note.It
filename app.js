// add note
function addNoteToList(note,id) {
  $('#show-notes').prepend("<li><div class='edit' id='"+id+"'>"+note+"</div><a href='#' id='delete_"+id+"'>X</a></li>");
  $("#"+id).editable("click",function(note,settings){
      notes[id] = note.value;
      localStorage['notes'] = JSON.stringify(notes);
      return(note);
    });

  $('#delete_' + id).on('click', function () {
    console.log(id);
      $('#' + id).closest('li').remove();
      notes.splice(id, 1);
      localStorage['notes'] = JSON.stringify(notes);
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
  addNoteToList(noteValue,notes.length - 1);

  // clear input field
  $('#note').val('').focus();
}

$('#submit').click(addNote);
$('#note').keyup(function(event){
  if (event.keyCode === 13) {
    addNote();
  }
});






