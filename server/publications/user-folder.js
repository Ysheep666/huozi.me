Meteor.publish('user-folder#list', function() {
  if (!Match.test(this.userId, String)) {
    return []
  }
  return UserFolders.find({
    userId: this.userId,
  }, {
    sort: {
      'folder.createdAt': -1
    },
    fields: {folder: true}
  })
})
