Template.navLeft.helpers({
  isSelected: function(){
    return Session.get('showLeftPanel');
  }
});

Template.navRight.helpers({
  isSelected: function(){
    return Session.get('showRightPanel');
  }
});

Template.navLeft.events({
  'click .mtr_toggle-left-panel': function() {
    Session.get('showLeftPanel') ? Session.set('showLeftPanel', null) : Session.set('showLeftPanel', true);
  }
});

Template.navRight.events({
  'click .mtr_edit-toggle': function() {
    var currentNote = Session.get('currentNote');

    if(Session.get('editing')) {
      updateContent(currentNote);
      Session.set('editing', null);
    } else {
      Session.set('editing', currentNote);
    }
  },

  'click .mtr_toggle-right-panel': function() {
    Session.get('showRightPanel') ? Session.set('showRightPanel', null) : Session.set('showRightPanel', true);
  },

  'click .mtr_new-note': function(){
    Meteor.call('newNote', Date.now(), function(error, newNoteId){
      Session.set('currentNote', newNoteId);
      Session.set('editing', newNoteId);
    });
  }
});
