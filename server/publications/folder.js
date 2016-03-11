Meteor.publishComposite('folder#list', function() {
  if (!Match.test(this.userId, String)) {
    return []
  }

  return {
    find() {
      return Folders.find({
        'members.userId': this.userId,
      }, {
        fields: {
          name: true,
        }
      })
    },
    children: [{
      find(folder) {
        return Notes.find({folderId: folder._id})
      }
    }]
  }
})

Meteor.publishComposite('folder#detail', function(id) {
  check(id, String)
  if (!Match.test(this.userId, String)) {
    return []
  }

  return {
    find() {
      return Folders.find({
        _id: id,
        'members.userId': this.userId,
      }, {limit: 1})
    },
    children: [{
      find(folder) {
        return Users.find({_id: {$in: _.pluck(folder.members, 'userId')}}, {
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
