Meteor.startup(() => {
  const {smtp} = Meteor.settings

  process.env.AUTOPREFIXER_OPTIONS = '{"browsers": ["> 1%", "last 2 versions"]}'
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.host) + ':' + smtp.port
})
