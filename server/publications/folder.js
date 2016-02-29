Meteor.publish('folder#detail', function(id) {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return Folders.find({
    _id: id,
    $or: [{
      createdByUserId: this.userId
    }, {
      authorizedUsers: {$in: [this.userId]}
    }]
  })
})
