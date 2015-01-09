Session.setDefault('showLeftPanel', null);
Session.setDefault('showRightPanel', null);

Template.panelLeft.helpers({
  showLeftPanel: function() {
    return Session.get('showLeftPanel');
  },

  note: function() {
    return Notes.find({});
  },

  shortContent: function() {
    return this.content.substr(0, 80)+'...'
  },

  isSelected: function() {
    return this._id === Session.get('currentNote') ? true : null;
  }
});

Template.panelLeft.events({
  'click .mtr_select-note': function() {
    Session.set('currentNote', this._id);
  }
});

Template.panelRight.helpers({
  showRightPanel: function() {
    return Session.get('showRightPanel');
  },

  note: function() {
    return Notes.find({_id: Session.get('currentNote')});
  }
});
