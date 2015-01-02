Session.setDefault('editing', null);

updateContent = function(noteId, template) {
  var noteContent = template.find('.mtr_edit-content');

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
