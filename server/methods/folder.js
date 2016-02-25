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
})
