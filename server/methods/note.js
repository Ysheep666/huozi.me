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
      members: [],
    }

    const folder = state && state == 'folder' ? Folders.findOne(value) : null
    if (folder) {
      note.folderId = folder._id
      if (!folder.isMember(this.userId)) {
        throw new Meteor.Error('note-create-not-allowed', '[methods] createNote -> Note create not allowed')
      }
    } else {
      note.members = [{
        userId: this.userId,
        isAdmin: true,
      }]
    }

    return Notes.insert(note)
  },
  updateNote(id, modifier) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] updateNote -> Invalid user')
    }

    const note = Notes.findOne(id)
    const folder = note && note.folderId ? Folders.findOne(note.folderId) : null

    if (!note.isMember(this.userId) && (!folder || !folder.isMember(this.userId))) {
      throw new Meteor.Error('note-update-not-allowed', '[methods] updateNote -> Note update not allowed')
    }

    return Notes.update(note._id, modifier)
  },
})
