Meteor.methods({
  createComment(content = '', parentId) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createComment -> Invalid user')
    }

    if (!content || content == '') {
      throw new Meteor.Error('content-invalid')
    }

    const user = Meteor.user()
    return Comments.insert({
      content,
      parentId: parentId ? parentId : '',
      user: {
        _id: user._id,
        name: user.profile && user.profile.nickname ? user.profile.nickname : user.username,
        avatar: user.profile && user.profile.avatar ? user.profile.avatar : ''
      }
    })
  },
})
