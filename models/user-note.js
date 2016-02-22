UserNotes = new Mongo.Collection('user-notes')

UserNotes.attachSchema(new SimpleSchema({
  userId: {
    type: String,
  },
  note: {
    type: Object,
  },
  'note._id': {
    type: String,
  },
  'note.name': {
    type: String,
  },
  'note.createdAt': {
    type: Date,
  },
  'note.updatedAt': {
    type: Date,
    optional: true,
    denyInsert: true,
  },
}))
