Comments = new Mongo.Collection('comments')

Comments.attachSchema(new SimpleSchema({
  content: {
    type: String,
  },
  parentId: {
    type: String,
    optional: true,
  },
  user: {
    type: Object,
  },
  'user._id': {
    type: String,
  },
  'user.name': {
    type: String,
  },
  'user.avatar': {
    type: String,
    optional: true,
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
