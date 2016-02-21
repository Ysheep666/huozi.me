Folders = new Mongo.Collection('folders')

Folders.attachSchema(new SimpleSchema({
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
    type: String
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

Folders.after.insert((userId, doc) => {
  Users.update(userId, {
    $push: {
      'profile.folders': {
        _id: doc._id,
        name: doc.name
      }
    }
  })
})
