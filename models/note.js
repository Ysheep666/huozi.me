Notes = new Mongo.Collection('notes')

Notes.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  createdByUserId: {
    type: String,
  },
  authorizedUsers: {
    type: Array,
    optional: true,
  },
  'authorizedUsers.$': {
    type: String,
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

Notes.after.insert((userId, doc) => {
  UserNotes.insert({
    user: {
      _id: userId,
    },
    note: {
      _id: doc._id,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  })
})