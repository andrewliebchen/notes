Meteor.methods({
  'updateNoteContent': function(noteId, args) {
    Notes.update(noteId, {$set: {
      content: args.content,
      updatedAt: args.updatedAt
    }});
  },

  'newNote': function(createdAt){
    return Notes.insert({
      createdAt: createdAt
    });
  }
});
