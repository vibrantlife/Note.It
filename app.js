function addNoteToList(note) {
  $('#show-notes').append("<li>" + note + " <a href='#' class='cancel-btn'>Cancel Note</a></li>");
}

if (localStorage['notes']) {
  var notes = JSON.parse(localStorage[
    'notes']);
} else {
  var notes = [];
}

for (var i=0; i < notes.length; i++) {
  addNoteToList(notes[i]);
}

var addNote = function() {
  // get value from note input
  var noteValue = $('#note').val();

  // add note to array
  notes.push(noteValue);

  // save to localStorage
  localStorage['notes'] = JSON.stringify(notes);

  // append note to addNoteToList
  addNoteToList(noteValue);

  // clear input field
  $('#note').val('').focus();
}

$('#submit').click(addNote);
$('#note').keyup(function(event){
  if (event.keyCode === 13) {
    addNote();
  }
});

$('.done-btn').on('click', function(){
  $(this).parent('li').addClass('done');
});

$('.cancel-btn').on('click', function(){
  $(this).parent('li').fadeOut('slow');

  });