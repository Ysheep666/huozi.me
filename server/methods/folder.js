Meteor.methods({
  createFolder(name = '') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createFolder -> Invalid user')
    }

    if (!name || name == '') {
      throw new Meteor.Error('folder-invalid')
    }

    return Folders.insert({
      name,
      members:[{
        userId: this.userId,
        isAdmin: true,
      }]
    })
  },
  updateFolder(id, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateFolder -> Invalid user')
    }

    const folder = Folders.findOne(id)
    if (!folder.isAdmin(this.userId)) {
      throw new Meteor.Error('folder-update-not-allowed', '[methods] updateFolder -> Folder update not allowed')
    }

    return Folders.update(folder._id, modifier)
  },
  deleteFolder(id) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] deleteFolder -> Invalid user')
    }

    const folder = Folders.findOne(id)
    if (!folder.isMember(this.userId)) {
      throw new Meteor.Error('folder-delete-not-allowed', '[methods] deleteFolder -> Folder delete not allowed')
    }

    if (!folder.isAdmin(this.userId)) {
      return Folders.update(folder._id, {$pull: {members: {userId: this.userId}}})
    } else {
      return Folders.remove(folder._id)
    }
  },
})
