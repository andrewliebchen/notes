Session.setDefault('currentNote', null);

function updateContent(noteId, template) {
  var noteContent = template.find('.mtr_edit-content');

  if(noteContent.value !== ''){
    Meteor.call('updateNoteContent', noteId, {
      content: noteContent.value,
      updatedAt: Date.now()
    });
  }
};

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
      updateContent(Session.get('currentNote'), template);
    }
  },

  'click .mtr_edit-toggle': function(event, template) {
    var currentNote = Session.get('currentNote');

    if(Session.get('editing')) {
      updateContent(currentNote, template);
      Session.set('editing', null);
    } else {
      Session.set('editing', currentNote);
    }
  }
});
