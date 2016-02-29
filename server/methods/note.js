Meteor.methods({
  createNote(name = '无标题') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createNote -> Invalid user')
    }

    return Notes.insert({
      name,
      target: {
        type: 'about',
      },
      createdByUserId: this.userId,
    })
  },
  updateNote(selector, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateNote -> Invalid user')
    }

    if (typeof selector !== 'string' || !/[a-zA-Z0-9]{17}/.test(selector)) {
      throw new Meteor.Error('selector-invalid')
    }

    const note = Notes.findOne(selector)
    if (!note || (this.userId != note.createdByUserId && note.authorizedUsers.indexOf(this.userId) < 0)) {
      throw new Meteor.Error('note-update-not-allowed', '[methods] updateNote -> Note update not allowed')
    }

    return Notes.update(selector, modifier)
  },
})
