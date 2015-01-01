Notes = new Meteor.Collection('notes');

if (Meteor.isClient) {
  Session.setDefault('editing', null);
  Session.setDefault('showPanel', null);
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

  UI.body.helpers({
    editing: function() {
      return Session.get('editing');
    }
  });

  Template.panel.helpers({
    showPanel: function() {
      return Session.get('showPanel');
    },

    note: function() {
      return Notes.find({});
    },

    isSelected: function() {
      return this._id === Session.get('currentNote') ? true : null;
    }
  });

  Template.panel.events({
    'click .mtr_toggle-panel': function(event, template) {
      Session.get('showPanel') ? Session.set('showPanel', null) : Session.set('showPanel', true);
    },

    'click .mtr_select-note': function() {
      Session.set('currentNote', this._id);
    }
  });

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
