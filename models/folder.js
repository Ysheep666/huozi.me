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
  UserFolders.insert({
    userId: userId,
    folder: {
      _id: doc._id,
      name: doc.name,
      createdAt: doc.createdAt,
    }
  })
})

Folders.after.update((userId, doc, fieldNames, modifier) => {
  const _modifier = {}
  if (!(fieldNames.indexOf('name') < 0)) {
    _modifier['folder.name'] = doc.name
  }

  if (!_.isEmpty(_modifier)) {
    _modifier['folder.updatedAt'] = doc.updatedAt
    UserFolders.update({'folder._id': doc._id}, {$set: _modifier}, {multi: true})
  }

  if (!(fieldNames.indexOf('authorizedUsers') < 0)) {
    if (!!modifier['$addToSet']) {
      if (!!modifier['$addToSet']['authorizedUsers']['$each']) {
        const users = modifier['$addToSet']['authorizedUsers']['$each']
        for (let i = 0; i < users.length; i++) {
          UserFolders.insert({
            userId: users[i],
            folder: {
              _id: doc._id,
              name: doc.name,
              createdAt: doc.createdAt,
            }
          })
        }
      } else {
        UserFolders.insert({
          userId: modifier['$addToSet']['authorizedUsers'],
          folder: {
            _id: doc._id,
            name: doc.name,
            createdAt: doc.createdAt,
          }
        })
      }
    } else {
      UserFolders.remove({userId: modifier['$pull']['authorizedUsers'], 'folder._id': doc._id})
    }
  }
})

Folders.before.remove((userId, doc) => {
  UserFolders.remove({'folder._id': doc._id})
})
