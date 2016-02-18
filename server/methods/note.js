Meteor.methods({
  createNote(name = '无标题') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createNote -> Invalid user')
    }

    return Notes.insert({name, createdByUserId: this.userId})
  },
})
