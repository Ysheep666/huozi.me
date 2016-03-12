const {Modal, Tabs} = Antd
const {TabPane} = Tabs

let profileWrap = null
const $Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
    }
  },
  handleClose() {
    this.d.setState({visible: false})
    ReactDOM.unmountComponentAtNode(profileWrap)
  },
  handleOpen(e) {
    e.preventDefault()
    if (!profileWrap) {
      profileWrap = document.createElement('div')
      document.body.appendChild(profileWrap)
    }

    const that = this
    ReactDOM.render(<Modal
      footer="" width="640" className="modaol-profile"
      visible={true}
      closable={true}
      onCancel={this.handleClose}>
      <Tabs defaultActiveKey="base">
        <TabPane tab="个人资料" key="base">
          <ProfileBase close={this.handleClose} user={this.data.user}/>
        </TabPane>
        <TabPane tab="修改密码" key="password">
          <ProfileChangePassword close={this.handleClose} user={this.data.user}/>
        </TabPane>
        <TabPane tab="消息设置" key="message">
          <ProfileNoticeSetting close={this.handleClose} user={this.data.user}/>
        </TabPane>
      </Tabs>
    </Modal>, profileWrap, function() {
      that.d = this
    })
  },
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleOpen
    return React.cloneElement(children, props)
  },
})

Profile = $Profile
