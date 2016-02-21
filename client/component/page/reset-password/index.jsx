const {Link} = ReactRouter
const {QueueAnim, Form, Input, Button, Message} = Antd

class $ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  validatePassword(rule, value, callback) {
    const {validateFields} = this.props.form
    if (value) {
      validateFields(['verifyPassword'])
    }
    callback()
  }
  validateVerifyPassword(rule, value, callback) {
    const {getFieldValue} = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！')
    } else {
      callback()
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {password} = values
        this.setState({buttonDisabled: true})
        Accounts.resetPassword(this.props.location.query.token || '', password, (error) => {
          if (error) {
            switch (error.reason) {
              case 'Token expired':
                Message.error('Token已过期！')
                break
              default:
                Message.error('重置密码失败，请等待一会再试！')
            }
            this.setState({buttonDisabled: false})
          } else {
            this.context.router.replace('/dashboard')
          }
        })
      }
    })
  }
  render() {
    const {sendEmail, waitingTime, buttonDisabled} = this.state
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <QueueAnim className="reset-password">
        <div className="reset-password-wrap" key="reset-password">
          <h1><Link to="/"><Logo/></Link></h1>
          <div className="box">
            <h2>重置密码</h2>
            <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <Form.Item hasFeedback>
                <Input
                  type="password" name="password" placeholder="密码"
                  {...getFieldProps('password', {
                    rules: [
                      {required: true, whitespace: true, message: '密码不能为空'},
                      {validator: this.validatePassword.bind(this)},
                    ],
                  })}/>
              </Form.Item>
              <Form.Item hasFeedback>
                <Input
                  type="password" name="verifyPassword" placeholder="确认密码"
                  {...getFieldProps('verifyPassword', {
                    rules: [
                      {required: true, whitespace: true, message: '请再次输入密码'},
                      {validator: this.validateVerifyPassword.bind(this)},
                    ],
                  })}/>
              </Form.Item>
              <Button htmlType="submit" disabled={buttonDisabled}>重置密码</Button>
            </Form>
          </div>
        </div>
      </QueueAnim>
    )
  }
}

$ResetPassword.contextTypes = {
  router: React.PropTypes.object.isRequired
}

ResetPassword = Form.create()($ResetPassword)
