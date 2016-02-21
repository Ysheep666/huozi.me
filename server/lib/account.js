const style = 'letter-spacing:-0.01em;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;font-size:16px;line-height:26px;font-family:Arial, Microsoft Yahei, sans-serif'

Accounts.emailTemplates.siteName = 'Started'
Accounts.emailTemplates.from = 'Started <postmaster@notice.started.cc>'

Accounts.emailTemplates.resetPassword.subject = () => '重置密码'
Accounts.emailTemplates.resetPassword.text = (user, url) => {
  return `尊敬的${user.username}，您好！
您好像忘记了密码，可以点击下面链接重置密码。
http\:\/\/started.cc\/reset-password?token=${user.services.password.reset.token}
非常感谢你的使用！`
}
Accounts.emailTemplates.resetPassword.html = (user, url) => {
  const html = Accounts.emailTemplates.resetPassword.text(user, url).replace(/\n/g, '<br/>')
  return `<div style="${style}">${html}</div>`
}
