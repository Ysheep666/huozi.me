const Schema = {}

Schema.Member = new SimpleSchema({
  userId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
})

Schema.Folder = new SimpleSchema({
  name: {
    type: String,
  },
  members: {
    type: Array,
  },
  'members.$': {
    type: Schema.Member,
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

Folders = new Mongo.Collection('folders')
Folders.attachSchema(Schema.Folder)

Folders.helpers({
  isMember(userId) {
    const isMember = !!_.find(this.members, (member) => {
      return member.userId == userId
    })

    return isMember
  },
  isAdmin(userId) {
    const isAdmin = !!_.find(this.members, (member) => {
      return member.userId == userId && member.isAdmin
    })

    return isAdmin
  },
})
