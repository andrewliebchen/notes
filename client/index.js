Session.setDefault('editing', null);

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
