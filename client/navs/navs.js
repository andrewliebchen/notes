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
  'click .mtr_toggle-left-panel': function(event, template) {
    Session.get('showLeftPanel') ? Session.set('showLeftPanel', null) : Session.set('showLeftPanel', true);
  }
});

Template.navRight.events({
  'click .mtr_edit-toggle': function(event, template) {
    var currentNote = Session.get('currentNote');

    if(Session.get('editing')) {
      updateContent(currentNote, template);
      Session.set('editing', null);
    } else {
      Session.set('editing', currentNote);
    }
  },

  'click .mtr_toggle-right-panel': function(event, template) {
    Session.get('showRightPanel') ? Session.set('showRightPanel', null) : Session.set('showRightPanel', true);
  }
});
