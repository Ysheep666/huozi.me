Notes = new Mongo.Collection('notes')

Notes.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  summary: {
    type: String,
    optional: true,
  },
  target: {
    type: Object,
    optional: true,
  },
  'target.type': {
    type: String,
  },
  'target.length': {
    type: Number,
    optional: true,
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
    userId: userId,
    note: {
      _id: doc._id,
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  })
})

Notes.after.update((userId, doc, fieldNames, modifier) => {
  if (!(fieldNames.indexOf('name') < 0)) {
    UserNotes.update({
      'note._id': doc._id,
    }, {
      $set: {
        'note.name': doc.name,
        'note.updatedAt': doc.updatedAt,
      }
    })
  }
})
