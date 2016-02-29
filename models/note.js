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
  },
  'target.type': {
    type: String,
    allowedValues: ['about', 'least', 'most'],
  },
  'target.length': {
    type: Number,
    optional: true,
  },
  'target.complete': {
    type: Number,
    optional: true,
  },
  stars: {
    type: Array,
    optional: true,
  },
  'stars.$': {
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
    userId: userId,
    note: {
      _id: doc._id,
      name: doc.name,
      target: doc.target,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  })
})

Notes.after.update((userId, doc, fieldNames, modifier) => {
  const _modifier = {}
  if (!(fieldNames.indexOf('name') < 0)) {
    _modifier['note.name'] = doc.name
  }

  if (!(fieldNames.indexOf('summary') < 0)) {
    _modifier['note.summary'] = doc.summary
  }

  if (!(fieldNames.indexOf('target') < 0)) {
    _modifier['note.target'] = doc.target
  }

  if (!(fieldNames.indexOf('stars') < 0)) {
    _modifier['note.star'] = !!modifier['$addToSet']
  }

  if (!_.isEmpty(_modifier)) {
    _modifier['note.updatedAt'] = doc.updatedAt
    UserNotes.update({userId: userId, 'note._id': doc._id}, {$set: _modifier})
  }
})
