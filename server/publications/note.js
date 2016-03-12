Meteor.publish('note#list', function(id) {
  if (!Match.test(this.userId, String)) {
    return []
  }

  return Notes.find({'members.userId': this.userId})
})

Meteor.publishComposite('note#detail', function(id) {
  check(id, String)
  if (!Match.test(this.userId, String)) {
    return []
  }

  return {
    find() {
      return Notes.find({_id: id}, {limit: 1})
    },
    children: [{
      find(note) {
        return Folders.find({_id: note.folderId}, {limit: 1})
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
    }, {
      find(note) {
        return Users.find({_id: {$in: _.pluck(note.members, 'userId')}}, {
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
