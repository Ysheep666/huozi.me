Meteor.publish('user-note#list', function() {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return UserNotes.find({
    userId: this.userId
  }, {
    fields: {
      note: true
    }
  })
})
