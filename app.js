var i = Number(localStorage.getItem('note-counter')) + 1,
$form = $('#note-form'),
$note = $('#show-note'),
$newNote = $('#note'),
order = [];

$form.submit(function(event) {
  event.preventDefault();
  $.publish('/add/', []);
  // announcing form has been submitted
});

$.subscribe('/add/', function() {
  if ($newNote.val() !== "")
    // save value of note field and save to local storage
   {
localStorage.setItem("note-" + i, $newNote.val());

// set note max counter so on page refresh it increments
localStorage.setItem('note-counter', i);

// append a new list note w/value of new note-counter
$note.append(
  "<li id='todo-" + i + "'>"
  + "<span class='editable'>"
  + localStorage.getItem("todo-" + i)
  + "</span><a href='#'>x</a></li>");
$.publish('/regenerate-note/', []);
// fade in note
$("todo-" + i).css('display', 'none').fadeIn();

// empty input
$newNote.val("");

i++;
  }
});

$.subscribe('/regenerate-note', function(){
  var $newNote = $('#show-notes li');
  // empty order []
  order.length = 0;

  // iterate. get id and add to array
  $newNote.each(function(){
    var $this = $(this).attr('id');
    order.push($this);
  });

  // convert array to string and + to local storage
  localStorage.setItem('todo-orders', order.join(','));
});