Notes = new Meteor.Collection('notes');

if (Meteor.isClient) {
  Session.setDefault('editing', null);
  Session.setDefault('currentPanel', null);

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
      return Session.get('currentPanel');
    }
  });

  Template.panel.events({
    'click .mtr_toggle-panel': function(event, template) {
      Session.get('currentPanel') ? Session.set('currentPanel', null) : Session.set('currentPanel', true);
    }
  });

  Template.note.helpers({
    editing: function() {
      return Session.get('editing');
    },

    note: function() {
      return Notes.find({});
    }
  });

  Template.note.events({
    'keyup .mtr_edit-content': function(event, template) {
      if (event.which == 32 || event.which == 8 || event.which == 13) {
        updateContent(this._id, template);
      }
    },

    'click .mtr_edit-toggle': function(event, template) {
      if(Session.get('editing')) {
        updateContent(this._id, template);
        Session.set('editing', null);
      } else {
        Session.set('editing', this._id);
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
