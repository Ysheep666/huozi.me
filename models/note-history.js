NoteHistories = new Mongo.Collection('note-histories')

NoteHistories.attachSchema(new SimpleSchema({
  _id: {
    type: String,
  },
  noteId: {
    type: String,
  },
}))
