Meteor.methods({
  createComment(content = '', parentId) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] createComment -> Invalid user')
    }

    if (!content || content == '') {
      throw new Meteor.Error('content-invalid')
    }

    return Comments.insert({
      userId: this.userId,
      parentId: parentId ? parentId : '',
      content,
    })
  },
  deleteComment(id) {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] deleteComment -> Invalid user')
    }

    const comment = Comments.findOne(id)
    if (this.userId != comment.userId) {
      throw new Meteor.Error('comment-delete-not-allowed', '[methods] deleteComment -> Comment delete not allowed')
    }

    return Comments.remove(comment._id)
  },
})
