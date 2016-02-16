const {Link} = ReactRouter
const {QueueAnim, Form, Input, Button, Message} = Antd

class $Register extends React.Component {
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
        const {username, email, password} = values
        this.setState({buttonDisabled: true})
        Accounts.createUser({username, email, password}, (error) => {
          if (error) {
            switch (error.reason) {
              case 'Username already exists.':
                Message.error('用户名已经被注册！')
                break
              case 'Email already exists.':
                Message.error('邮箱已经被注册！')
                break
              default:
                Message.error('注册失败，请等待一会再试！')
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
      <QueueAnim className="register">
        <div className="register-wrap" key="register">
          <h1><Link to="/"><Logo/></Link></h1>
          <div className="box">
            <h2>创建账号</h2>
            <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <Form.Item hasFeedback>
                <Input
                  type="text" name="username" placeholder="用户名"
                  {...getFieldProps('username', {
                    rules: [
                      {required: true, whitespace: true, message: '用户名不能为空'},
                    ],
                  })}/>
              </Form.Item>
              <Form.Item hasFeedback>
                <Input
                  type="text" name="email" placeholder="邮箱"
                  {...getFieldProps('email', {
                    validate: [{
                      rules: [
                        {required: true, message: '邮箱不能为空'},
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
              <Button htmlType="submit" disabled={buttonDisabled}>注册</Button>
            </Form>
          </div>
          <div className="auth-footer">
            <Link to="/login">已有账号，点此登录</Link>
          </div>
        </div>
      </QueueAnim>
    )
  }
}

$Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Register = Form.create()($Register)
