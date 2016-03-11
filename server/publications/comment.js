Meteor.publishComposite('comment#list', function(id) {
  if (!Match.test(this.userId, String)) {
    return []
  }

  return {
    find() {
      return Comments.find({
        $or: [{
          _id: id,
        }, {
          parentId: id,
        }]
      })
    },
    children: [{
      find(comment) {
        return Users.find({
          _id: comment.userId
        }, {
          limit: 1,
          fields: {
            emails: true,
            username: true,
            profile: true,
          }
        })
      }
    }]
  }
})
