Meteor.methods({
  getQiniuToken(name = '') {
    const {qiniu} = Meteor.settings
    const bucket = ((function () {
      const results = []
      const buckets = qiniu.buckets
      for (let i = 0; i < buckets.length; i++) {
        let b = buckets[i]
        if (b.name === name.trim()) {
          results.push(b)
        }
      }
      return results
    })())[0] || {}

    const scope = bucket.name
    const deadline = moment().add(30, 's').unix()
    const policy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify({scope, deadline})))

    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(policy, qiniu.secret))
    return {
      host: bucket.host,
      token: (qiniu.access + ':' + signature + ':' + policy).replace(/(\+)/g, '-').replace(/(\/)/g, '_')
    }
  },
  getWilddogToken() {
    if (!this.userId) {
      throw new Meteor.Error('invalid-user', '[methods] getWilddogToken -> Invalid user')
    }

    return {
      token: Jwt.sign({
        v: 0,
        iat: Date.parse(new Date()) / 1000,
        d: {
          uid: this.userId,
          provider: 'started'
        }
      }, Meteor.settings.wilddog.secret, {algorithm: 'HS256'})
    }
  },
})
