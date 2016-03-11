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
      }
    }]
  }
})
