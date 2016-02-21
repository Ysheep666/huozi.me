UserNotes = new Mongo.Collection('user-notes')

UserNotes.attachSchema(new SimpleSchema({
  user: {
    type: Object,
  },
  'user._id': {
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
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      } else {
        this.unset()
      }
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
  },
}))
