Meteor.publish('user-note#list', function() {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return UserNotes.find({
    'user._id': this.userId
  }, {
    fields: {
      note: true
    }
  })
})
