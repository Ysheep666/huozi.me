Meteor.publish('user-note#list', function() {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return UserNotes.find({
    userId: this.userId,
  }, {
    sort: {
      'note.createdAt': -1
    },
    fields: {
      folderId: true,
      note: true,
    }
  })
})
