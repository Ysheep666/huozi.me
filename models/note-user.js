NoteUsers = new Mongo.Collection('note-users')

NoteUsers.attachSchema(new SimpleSchema({
  _id: {
    type: String,
  },
  noteId: {
    type: String,
  },
  'color': {
    type: String,
    optional: true,
  },
  'cursor': {
    type: Object,
    optional: true,
  },
}))
