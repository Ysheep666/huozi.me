Meteor.methods({
  updateUserNote(selector, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateUserNote -> Invalid user')
    }

    if (typeof selector === 'string' && /[a-zA-Z0-9]{17}/.test(selector)) {
      const userNote = UserNotes.findOne(id)
      if (!note || this.userId != userNote.userId) {
        throw new Meteor.Error('userNote-update-not-allowed', '[methods] updateUserNote -> Note update not allowed')
      }
      return UserNotes.update(selector, modifier)
    } else {
      if (!selector.userId || this.userId != selector.userId) {
        throw new Meteor.Error('selector-invalid')
      }

      return UserNotes.update(selector, modifier)
    }
  },
})
