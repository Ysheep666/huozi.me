const {Form, Button, Switch, Icon, Message} = Antd

class $ProfileNoticeSetting extends React.Component {
  constructor(props) {
    super(props)
    const {notice} = this.props.user.profile
    this.state = {
      notice: {
        email: notice && notice.email ? notice.email : false,
        desktop: notice && notice.desktop ? notice.desktop : false,
      },
      buttonDisabled: false,
    }
  }
  handleEmailChange(checked) {
    this.setState({notice: Object.assign({}, this.state.notice, {email: checked})})
  }
  handleDesktopChange(checked) {
    this.setState({notice: Object.assign({}, this.state.notice, {desktop: checked})})
  }
  handleSubmit(e) {
    e.preventDefault()
    const {email, desktop} = this.state.notice
    this.setState({buttonDisabled: true})
    Users.update(this.props.user._id, {$set: {
      'profile.notice': {email, desktop},
    }}, (error) => {
      if (!error) {
        this.props.close()
      } else {
        this.setState({buttonDisabled: false})
        Message.error('数据更新失败，请等待一会再试！')
      }
    })
  }
  render() {
    const formItemLayout = {labelCol: {span: 14, offset: 3}, wrapperCol: {span: 3, offset: 1}}
    const {notice, buttonDisabled} = this.state
    return (
      <div className="profile-notice-setting">
        <Form horizontal>
          <Form.Item label={(
            <div>
              <h4>邮件通知</h4>
              <p>系统会发送邮件到您的邮箱提醒有新消息</p>
            </div>
          )} {...formItemLayout}>
            <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>} checked={notice.email} onChange={this.handleEmailChange.bind(this)}/>
          </Form.Item>
          <Form.Item label={(
            <div>
              <h4>桌面通知</h4>
              <p>系统会弹出气泡提醒你有新消息（仅对 Chrome 、Firefox 和 Safari 浏览器有效）</p>
            </div>
          )} {...formItemLayout}>
            <Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross"/>} checked={notice.desktop} onChange={this.handleDesktopChange.bind(this)}/>
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

ProfileNoticeSetting = $ProfileNoticeSetting
