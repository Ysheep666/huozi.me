Meteor.publish('user#list', function(ids) {
  return Users.find({_id: {$in: ids}}, {
    fields: {
      emails: true,
      username: true,
      profile: true,
    }
  })
})
