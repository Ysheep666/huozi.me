Meteor.methods({
  createNote(name = '', {state, value}) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createNote -> Invalid user')
    }

    const note = {
      name,
      stars: state && state == 'star' ? [this.userId] : [],
      target: {
        type: 'about',
      },
      createdByUserId: this.userId,
    }

    const folder = state && state == 'folder' ? Folders.findOne(value) : null
    if (folder) {
      note.folderId = folder._id
      note.authorizedUsers = []
      if (folder.createdByUserId != this.userId) {
        note.authorizedUsers.push(folder.createdByUserId)
      }

      if (folder.authorizedUsers) {
        for (let i = 0; i < folder.authorizedUsers.length; i++) {
          if (folder.authorizedUsers[i] != this.userId) {
            note.authorizedUsers.push(folder.authorizedUsers[i])
          }
        }
      }
    }

    return Notes.insert(note)
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
