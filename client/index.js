Session.setDefault('editing', null);

var DateFormats = {
  short: "M/D/YY @ h:mma",
  long:  "ddd, MMM Do 'YY @ h:mma"
};

updateContent = function(noteId) {
  var noteContent = document.getElementById('mtr_edit-content');

  if(noteContent.value !== ''){
    Meteor.call('updateNoteContent', noteId, {
      content: noteContent.value,
      updatedAt: Date.now()
    });
  }
};

UI.body.helpers({
  editing: function() {
    return Session.get('editing');
  }
});

// http://stackoverflow.com/a/18597006
UI.registerHelper('formatDate', function(datetime, format) {
  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});
