Notes = new Meteor.Collection('notes');

if (Meteor.isClient) {
  Session.setDefault('editing', null);

  Template.notes.helpers({
    editing: function() {
      return Session.get('editing');
    },

    note: function() {
      return Notes.find({});
    }
  });

  function updateContent(noteId, template) {
    var noteContent = template.find('.mtr_edit-content');

    if(noteContent.value !== ''){
      Meteor.call('updateNoteContent', noteId, {
        content: noteContent.value,
        updatedAt: Date.now()
      });
    }
  };

  Template.notes.events({
    'click .mtr_edit-note': function() {
      Session.set('editing', this._id);
    },

    'keyup .mtr_edit-content': function(event, template) {
      if (event.which == 32 || event.which == 8 || event.which == 13) {
        updateContent(this._id, template);
      }
    },

    'click .mtr_done-editing-note': function(event, template) {
      updateContent(this._id, template);
      Session.set('editing', null);
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'updateNoteContent': function(noteId, args) {
      Notes.update(noteId, {$set: {
        content: args.content,
        updatedAt: args.updatedAt
      }});
    }
  })
}
