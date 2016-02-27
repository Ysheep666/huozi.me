Meteor.methods({
  createNote(name = '无标题') {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createNote -> Invalid user')
    }

    return Notes.insert({name, createdByUserId: this.userId})
  },
  updateNote(id, {name, summary, target}) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createNote -> Invalid user')
    }

    if ((name && name == '') || (summary && summary == '')) {
      throw new Meteor.Error('note-invalid')
    }

    const note = Notes.findOne(id)
    if (this.userId != note.createdByUserId && note.authorizedUsers.indexOf(this.userId) < 0) {
      throw new Meteor.Error('note-update-not-allowed', '[methods] updateNote -> Note update not allowed')
    }

    const doc = {}
    if (name) { doc.name = name }
    if (summary) { doc.summary = summary }
    if (target) { doc.target = target }
    return Notes.update(note._id, {'$set': doc})
  },
})
