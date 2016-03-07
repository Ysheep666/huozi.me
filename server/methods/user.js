Meteor.methods({
  searchUser(query) {
    const search = new RegExp(query)
    return Users.find({
      $or: [{
        username: search
      }, {
        'emails.0.address': search
      }, {
        'profile.nickname': search
      }]
    }, {
      limit: 10,
      fields: {
        emails: true,
        username: true,
        profile: true,
      }
    }).fetch()
  },
})
