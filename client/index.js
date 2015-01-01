Session.setDefault('editing', null);

UI.body.helpers({
  editing: function() {
    return Session.get('editing');
  }
});
