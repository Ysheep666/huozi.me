UserFolders = new Mongo.Collection('user-folders')

UserFolders.attachSchema(new SimpleSchema({
  userId: {
    type: String,
  },
  folder: {
    type: Object,
  },
  'folder._id': {
    type: String,
  },
  'folder.name': {
    type: String,
  },
  'folder.createdAt': {
    type: Date,
  },
  'folder.updatedAt': {
    type: Date,
    optional: true,
    denyInsert: true,
  },
}))
