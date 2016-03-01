const {Form, Input, Button, Message} = Antd

class $ProfileChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: false
    }
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
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次输入密码不一致！')
    } else {
      callback()
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {oldPassword, newPassword} = values
        this.setState({buttonDisabled: true})
        Accounts.changePassword(oldPassword, newPassword, (error) => {
          if (error) {
            switch (error.reason) {
              case 'Incorrect password':
                Message.error('当前密码输入错误！')
                break
              default:
                Message.error('修改密码失败，请等待一会再试！')
            }
            this.setState({buttonDisabled: false})
          } else {
            this.props.close()
          }
        })
      }
    })
  }
  render() {
    const formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 10}}
    const {user} = this.props
    const {buttonDisabled} = this.state
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <div className="profile-change-password">
        <Form horizontal form={this.props.form}>
          <Form.Item label="当前密码：" hasFeedback {...formItemLayout}>
            <Input
              type="password" name="oldPassword" placeholder="当前密码"
              {...getFieldProps('oldPassword', {
                rules: [
                  {required: true, whitespace: true, message: '密码不能为空'},
                ],
              })}/>
          </Form.Item>
          <Form.Item label="新密码：" hasFeedback {...formItemLayout}>
            <Input
              type="password" name="newPassword" placeholder="新密码"
              {...getFieldProps('newPassword', {
                rules: [
                  {required: true, whitespace: true, message: '密码不能为空'},
                  {validator: this.validatePassword.bind(this)},
                ],
              })}/>
          </Form.Item>
          <Form.Item label="确认密码：" hasFeedback {...formItemLayout}>
            <Input
              type="password" name="verifyPassword" placeholder="确认密码"
              {...getFieldProps('verifyPassword', {
                rules: [
                  {required: true, whitespace: true, message: '请再次输入密码'},
                  {validator: this.validateVerifyPassword.bind(this)},
                ],
              })}/>
          </Form.Item>
        </Form>
        <div className="profile-footer">
          <Button type="ghost" size="large" onClick={this.props.close}>取消</Button>
          <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)} disabled={buttonDisabled}>确定</Button>
        </div>
      </div>
    )
  }
}

ProfileChangePassword = Form.create()($ProfileChangePassword)
