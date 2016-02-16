const {Link} = ReactRouter
const {QueueAnim, Form, Input, Button, Message} = Antd

class $Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {username, password} = values
        this.setState({buttonDisabled: true})
        Meteor.loginWithPassword(username, password, (error) => {
          if (error) {
            switch (error.reason) {
              case 'User not found':
                Message.error('用户名或邮箱不存在！')
                break
              case 'Incorrect password':
                Message.error('密码输入错误！')
                break
              default:
                Message.error('登录失败，请等待一会再试！')
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
    const {buttonDisabled} = this.state
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <QueueAnim className="login">
        <div className="login-wrap" key="login">
          <h1><Link to="/"><Logo/></Link></h1>
          <div className="box">
            <h2>
              登录你的账号
              <span className="or">或</span>
              <Link to="/register">创建账号</Link>
            </h2>
            <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="on">
              <Form.Item hasFeedback>
                <Input
                  type="text" name="username"
                  placeholder="用户名或邮箱" autoComplete="on"
                  {...getFieldProps('username', {
                    validate: [{
                      rules: [
                        {required: true, message: '请输入用户名或邮箱'},
                      ],
                      trigger: 'onBlur',
                    }]
                  })}/>
              </Form.Item>
              <Form.Item hasFeedback>
                <Input
                  type="password" name="password"
                  placeholder="密码" autoComplete="on"
                  {...getFieldProps('password', {
                    rules: [
                      {required: true, whitespace: true, message: '请输入密码'},
                    ],
                  })}/>
              </Form.Item>
              <Button htmlType="submit" disabled={buttonDisabled}>登录</Button>
            </Form>
          </div>
          <div className="auth-footer">
            <Link to="/forgot-password">忘记密码？点击找回密码</Link>
          </div>
        </div>
      </QueueAnim>
    )
  }
}

$Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Login = Form.create()($Login)
