Meteor.startup(() => {
  const {smtp} = Meteor.settings

  process.env.AUTOPREFIXER_OPTIONS = '{"browsers": ["> 1%", "last 2 versions"]}'
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.host) + ':' + smtp.port

  UsersIndex = new EasySearch.Index({
    engine: new EasySearch.MongoDB({
      fields(searchObject, options) {
        return {
          username: true,
          emails: true,
          profile: true,
        }
      },
    }),
    collection: Users,
    fields: ['username', 'emails.address', 'profile.nickname'],
    defaultSearchOptions: {
      limit: 10,
    },
  })
})
