if (Meteor.isServer) {
  Meteor.startup(function() {
    Notes.remove({});

    if(Notes.find().count() === 0) {
      Notes.insert({
        content: 'Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor.',
        createdAt: Date.now()
      });
    }
  });
}
