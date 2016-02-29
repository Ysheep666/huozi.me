Meteor.publish('comment#list', function(id) {
  if (!Match.test(this.userId, String)) {
    return []
  }

  return Comments.find({
    $or: [{
      _id: id,
    }, {
      parentId: id,
    }]
  })
})
