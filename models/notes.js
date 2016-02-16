Notes = new Mongo.Collection('notes')

Notes.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  authorizedUsers: {
    type: Array,
    optional: true,
  },
  'authorizedUsers.$': {
    type: String,
  },
  createdByUserId: {
    type: String,
    autoValue() {
      return this.userId
    },
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
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
    denyInsert: true,
    optional: true,
  },
}))

Notes.allow({
  insert(userId) {
    return !!userId
  },
  update(userId, doc) {
    return userId && userId == doc.createdByUserId
  },
  remove(userId, doc) {
    return userId && userId == doc.createdByUserId
  },
  fetch: ['createdByUserId'],
})
