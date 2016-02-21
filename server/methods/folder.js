Meteor.methods({
  createFolder(name = '') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createFolder -> Invalid user')
    }

    return Folders.insert({name, createdByUserId: this.userId})
  },
})
