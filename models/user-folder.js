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

UserFolders.after.insert((userId, doc) => {
  const notes = Notes.find({folderId: doc.folder._id}).fetch()
  _.each(notes, (note) => {
    UserNotes.insert({
      userId: doc.userId,
      folderId: doc.folder._id,
      note: {
        _id: note._id,
        name: note.name,
        target: note.target,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      }
    })
  })
})

UserFolders.after.remove((userId, doc) => {
  UserNotes.remove({userId: doc.userId, folderId: doc.folder._id})
})
