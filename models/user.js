const Schema = {}

Schema.Notice = new SimpleSchema({
  email: {
    type: Boolean,
    optional: true,
  },
  desktop: {
    type: Boolean,
    optional: true,
  },
})

Schema.Profile = new SimpleSchema({
  nickname: {
    type: String,
    optional: true,
  },
  avatar: {
    type: String,
    optional: true,
  },
  sex: {
    type: String,
    allowedValues: ['male', 'female'],
    optional: true,
  },
  birthday: {
    type: Date,
    optional: true,
  },
  description : {
    type: String,
    optional: true,
  },
  notice: {
    type: Schema.Notice,
    optional: true,
  },
})

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  registered_emails: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    type: Schema.Profile,
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    type: [String],
    optional: true,
  },
  heartbeat: {
    type: Date,
    optional: true,
  },
})

Users = Meteor.users
Users.attachSchema(Schema.User)
