Meteor.methods({
  'updateNoteContent': function(noteId, args) {
    Notes.update(noteId, {$set: {
      content: args.content,
      updatedAt: args.updatedAt
    }});
  }
});
