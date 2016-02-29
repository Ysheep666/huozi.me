UserNotes = new Mongo.Collection('user-notes')

UserNotes.attachSchema(new SimpleSchema({
  userId: {
    type: String,
  },
  folderId: {
    type: String,
    optional: true,
  },
  isArchive: {
    type: Boolean,
    optional: true,
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
  'note.summary': {
    type: String,
    optional: true,
  },
  'note.target': {
    type: Object,
  },
  'note.target.type': {
    type: String,
    allowedValues: ['about', 'least', 'most'],
  },
  'note.target.length': {
    type: Number,
    optional: true,
  },
  'note.target.complete': {
    type: Number,
    optional: true,
  },
  'note.star': {
    type: Boolean,
    optional: true,
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
