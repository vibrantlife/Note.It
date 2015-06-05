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

$('#submit').on('click', function(){
  // console.log('inside submit');
  if($.trim($('#note').val()) === '' ){
    alert('Opps! You forgot to add a note!');
  } else {
    addNote();
  }
});



//add note to list
function addNoteToList(note,id) {
  var $noteElement = $("<li><div class='editable' id='"+ id + "'>" + note + "</div><a href='#' class='delete' id='delete_" + id + "'>Delete</a></li>" );
  var $form = $('#note-form');
  var $noteList = $('#show-notes');
  $newNote = $('#note');

  $form.submit(function(event){
    event.preventDefault();
  })

  // append note to div
  $('#show-notes').prepend(
    ($noteElement).hide().fadeIn('slow')
    );


// edit note
  $("#"+id).editable("click",function(note,settings){
      notes[id] = note.value;
      localStorage['notes'] = JSON.stringify(notes);
      return(note);
    }, {
      type: 'text',
      cols: 50,
      cancel: 'cancel',
      submit: 'submit',
      placeholder: "Click to set text",
      tooltip: "Click to update",
      text: {
        element: function(settings, original) {
          var input = $('<input size=50>');
          console.log('inside text element fxn');
          if (settings.width !== 'none') {
            input.width(settings.width);
          }
        }
      }
});
// delete note
  $('#delete_' + id).on('click', function () {
      $(this).parent().fadeOut(500, function() {
        $(this).closest('li').remove();
        notes.splice(id, 1);
        localStorage['notes'] = JSON.stringify(notes);
      });
  });
}

if (localStorage['notes']) {
  var notes = JSON.parse(localStorage[
    'notes']);
} else {
  var notes = [];
}

// loop through all notes on list and add them
for (var i=0; i < notes.length; i++) {
  addNoteToList(notes[i],i);
}



