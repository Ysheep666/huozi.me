Meteor.methods({
  createFolder(name = '') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createFolder -> Invalid user')
    }

    if (!name || name == '') {
      throw new Meteor.Error('folder-invalid')
    }

    return Folders.insert({name, createdByUserId: this.userId})
  },
  updateFolder(selector, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateFolder -> Invalid user')
    }

    if (typeof selector !== 'string' || !/[a-zA-Z0-9]{17}/.test(selector)) {
      throw new Meteor.Error('selector-invalid')
    }

    const folder = Folders.findOne(selector)
    if (!folder || this.userId != folder.createdByUserId) {
      throw new Meteor.Error('folder-update-not-allowed', '[methods] updateFolder -> Folder update not allowed')
    }

    return Folders.update(selector, modifier)
  },
  deleteFolder(id) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] deleteFolder -> Invalid user')
    }

    const folder = Folders.findOne(id)
    if (this.userId != folder.createdByUserId && (!folder.authorizedUsers || folder.authorizedUsers.indexOf(this.userId) < 0)) {
      throw new Meteor.Error('folder-delete-not-allowed', '[methods] deleteFolder -> Folder delete not allowed')
    }

    if (this.userId == folder.createdByUserId) {
      return Folders.remove(folder._id)
    } else {
      return Folders.update(folder._id, {$pull: {authorizedUsers: this.userId}})
    }
  },
})
