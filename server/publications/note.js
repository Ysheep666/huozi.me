Meteor.publish('note#detail', function(id) {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return Notes.find({
    _id: id,
    $or: [{
      createdByUserId: this.userId
    }, {
      authorizedUsers: {$in: [this.userId]}
    }]
  })
})
