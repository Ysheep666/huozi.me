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
  deleteComment(id) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] deleteComment -> Invalid user')
    }

    const comment = Comments.findOne(id)
    if (this.userId != comment.user._id) {
      throw new Meteor.Error('comment-delete-not-allowed', '[methods] deleteComment -> Comment delete not allowed')
    }

    return Comments.remove(comment._id)
  },
})
