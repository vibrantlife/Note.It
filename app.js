// create note
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

if (localStorage['notes']) {
  var notes = JSON.parse(localStorage[
    'notes']);
} else {
  var notes = [];
}



//add note to list
function addNoteToList(note,id) {
  var $noteElement = $("<li><div class='edit' id='"+ id + "'>" + note +"</div><a href='#' id='delete_" + id + "'>X</a></li>");
  var $form = $('#note-form');
  var $noteList = $('#show-notes');
  $newNote = $('#note');


  // append note to div
  $('#show-notes').prepend($noteElement).fadeIn('slow');

// edit note
  $("#"+id).editable("click",function(note,settings){
      notes[id] = note.value;
      localStorage['notes'] = JSON.stringify(notes);
      return(note);
    });
// delete note
  $('#delete_' + id).on('click', function () {
      $(this).parent().fadeOut(1600, function() {
        $(this).closest('li').remove();
        console.log(notes);
        notes.splice(id, 1);
        localStorage['notes'] = JSON.stringify(notes);
      });
  });
}

// loop through all notes on list and add them
for (var i=0; i < notes.length; i++) {
  addNoteToList(notes[i],i);
}



