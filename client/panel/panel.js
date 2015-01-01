Session.setDefault('showPanel', null);

Template.panel.helpers({
  showPanel: function() {
    return Session.get('showPanel');
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

Template.panel.events({
  'click .mtr_toggle-panel': function(event, template) {
    Session.get('showPanel') ? Session.set('showPanel', null) : Session.set('showPanel', true);
  },

  'click .mtr_select-note': function() {
    Session.set('currentNote', this._id);
  }
});
