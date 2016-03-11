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
      members: [{
        userId: this.userId,
        isAdmin: true,
      }],
    }

    const folder = state && state == 'folder' ? Folders.findOne(value) : null
    if (folder) {
      note.folderId = folder._id
      if (!folder.isMember(this.userId)) {
        throw new Meteor.Error('note-create-not-allowed', '[methods] createNote -> Note create not allowed')
      }
    }

    return Notes.insert(note)
  },
  updateNote(id, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateNote -> Invalid user')
    }

    const note = Notes.findOne(id)
    const folder = note.folderId ? Folders.findOne(note.folderId) : null

    if (!note.isMember(this.userId) && (!folder || !folder.isMember(this.userId))) {
      throw new Meteor.Error('note-update-not-allowed', '[methods] updateNote -> Note update not allowed')
    }

    return Notes.update(note._id, modifier)
  },
})
