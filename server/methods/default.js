Meteor.methods({
  getWilddogToken() {
    if (!this.userId) {
      throw new Meteor.Error('get-wilddog-token', '[methods] getWilddogToken -> Invalid user')
    }

    return Jwt.sign({
      v: 0,
      iat: Date.parse(new Date()) / 1000,
      d: {
        uid: this.userId,
        provider: 'started'
      }
    }, Meteor.settings.wilddog.secret, {algorithm: 'HS256'})
  },
})
