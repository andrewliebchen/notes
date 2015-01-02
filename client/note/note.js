Session.setDefault('currentNote', null);

Template.note.helpers({
  editing: function() {
    return Session.get('editing');
  },

  note: function() {
    return Notes.find({_id: Session.get('currentNote')});
  }
});

Template.note.events({
  'keyup .mtr_edit-content': function(event, template) {
    if (event.which == 32 || event.which == 8 || event.which == 13) {
      updateContent(Session.get('currentNote'));
    }
  }
});
