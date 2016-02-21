const {Link} = ReactRouter
const {QueueAnim, Form, Input, Button, Message} = Antd

class $ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendEmail: null,
      waitingTime: 0,
      buttonDisabled: false,
    }
  }
  componentWillUnmount() {
    if (!!this.waiting) {
      window.clearInterval(this.waiting)
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {email} = values
        this.setState({buttonDisabled: true})
        Accounts.forgotPassword({email}, (error) => {
          if (error) {
            switch (error.reason) {
              case 'User not found':
                Message.error('邮箱不存在！')
                break
              default:
                Message.error('找回密码失败，请等待一会再试！')
            }
            this.setState({buttonDisabled: false})
          } else {
            this.setState({sendEmail: email, waitingTime: 60})
            this.waiting = window.setInterval(() => {
              let time = this.state.waitingTime - 1
              if (time == 0) {
                this.setState({buttonDisabled: false})
                window.clearInterval(this.waiting)
              }
              this.setState({waitingTime: time})
            }, 1000)
          }
        })
      }
    })
  }
  render() {
    const {sendEmail, waitingTime, buttonDisabled} = this.state
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <QueueAnim className="forgot-password">
        <div className="forgot-password-wrap" key="forgot-password">
          <h1><Link to="/"><Logo/></Link></h1>
          <div className="box">
            <h2>找回密码</h2>
            {!sendEmail ? (
              <p className="help">我们将发一封邮件到您的邮箱引导完成重置密码操作</p>
            ) : (
              <p className="help">密码重置邮件已发送到 {sendEmail}，请尽快登录你的邮箱重置密码</p>
            )}
            <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <Form.Item hasFeedback>
                <Input
                  type="text" name="email" placeholder="邮箱"
                  {...getFieldProps('email', {
                    validate: [{
                      rules: [
                        {required: true, message: '请输入邮箱'},
                      ],
                      trigger: 'onBlur',
                    }, {
                      rules: [
                        {type: 'email', message: '请输入正确的邮箱地址'},
                      ],
                      trigger: ['onBlur', 'onChange'],
                    }]
                  })}/>
              </Form.Item>
              <Button htmlType="submit" disabled={buttonDisabled}>{waitingTime ? waitingTime + ' s' : '发送'}</Button>
            </Form>
          </div>
          <div className="auth-footer">
            <Link to="/login">返回登录</Link>
          </div>
        </div>
      </QueueAnim>
    )
  }
}

ForgotPassword = Form.create()($ForgotPassword)
