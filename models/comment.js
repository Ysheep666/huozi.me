const Schema = {}

Schema.Comment = new SimpleSchema({
  userId: {
    type: String,
  },
  parentId: {
    type: String,
    optional: true,
  },
  content: {
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
})

Comments = new Mongo.Collection('comments')
Comments.attachSchema(Schema.Comment)

Comments.helpers({
  getUser() {
    return Users.findOne(this.userId)
  },
})
