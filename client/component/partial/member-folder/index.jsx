const {Row, Col, Checkbox, Icon, Input, Button, Modal, Message} = Antd

class MemberItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {user, manager} = this.props
    return (
      <div>
        <Row>
          <Col span="10">
            <div className="avatar">
              {!user ? (
                <div className="avatar-box loading"></div>
              ) : (
                <div className="avatar-box">
                  {user.profile && user.profile.avatar ? (
                    <img className="image" src={user.profile.avatar + '!avatar'}/>
                  ) : (
                    <div className="text">{user && user.username.substr(0, 1).toLocaleUpperCase()}</div>
                  )}
                </div>
              )}
            </div>
            {user.profile ? user.profile.nickname : user.username}
          </Col>
          <Col span="10">{user.emails[0].address}</Col>
          {manager ? (
            <Col span="4" className="status">管理员</Col>
          ) : (
            <Col span="4" className="status">成员</Col>
          )}
        </Row>
      </div>
    )
  }
}

const Content = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      queryUsers: [],
      selectUsers: [],
      edit: false,
      buttonDisabled: false
    }
  },
  getMeteorData() {
    const members = []
    const {folder} = this.props

    members.push(folder.createdByUserId)
    if (folder.authorizedUsers && folder.authorizedUsers.length > 0) {
      for (let i = 0; i < folder.authorizedUsers.length; i++) {
        members.push(folder.authorizedUsers[i])
      }
    }

    Meteor.subscribe('user#list', members)
    return {
      users: Users.find().fetch()
    }
  },
  handleSearch(e) {
    if (this._search) {
      clearTimeout(this._search)
    }

    this._search = setTimeout(() => {
      if (!e.target.value) {
        this.setState({queryUsers: []})
      } else {
        Meteor.call('searchUser', e.target.value, (error, results) => {
          if (!error) {
            this.setState({queryUsers: results})
          }
        })
      }
    }, 500)
  },
  handleSwitchSelectUser(user) {
    return (e) => {
      const {selectUsers} = this.state
      const selectUserIds = _.pluck(selectUsers, '_id')

      if (selectUserIds.indexOf(user._id) < 0) {
        selectUsers.push(user)
      } else {
        selectUsers.splice(selectUserIds.indexOf(user._id), 1)
      }

      this.setState({selectUsers})
    }
  },
  render() {
    const {queryUsers, selectUsers, edit, buttonDisabled} = this.state
    const {users} = this.data
    const {folder} = this.props
    const selectUserIds = _.pluck(selectUsers, '_id')

    if (edit) {
      return (
        <div>
          <div className="ant-modal-header">
            <div className="ant-modal-title">添加成员</div>
          </div>
          <div className="member-add-box">
            <Row>
              <Col span="12" className="people-content">
                <div className="search">
                  <Input type="text" placeholder="搜索用户进行添加" onChange={this.handleSearch}/>
                </div>
                <div className="query-users">
                  {queryUsers.map((user, i) => {
                    if (user._id != folder.createdByUserId && (!folder.authorizedUsers || folder.authorizedUsers.indexOf(user._Id) < 0)) {
                      const checked = !(selectUserIds.indexOf(user._id) < 0)
                      return (
                        <div key={i} onClick={this.handleSwitchSelectUser(user)}>
                          <div className="avatar">
                            {!user ? (
                              <div className="avatar-box loading"></div>
                            ) : (
                              <div className="avatar-box">
                                {user.profile && user.profile.avatar ? (
                                  <img className="image" src={user.profile.avatar + '!avatar'}/>
                                ) : (
                                  <div className="text">{user && user.username.substr(0, 1).toLocaleUpperCase()}</div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="name">{user.profile ? user.profile.nickname : user.username}</div>
                          <div className="email">{user.emails[0].address}</div>
                          <div className="status"><Checkbox checked={checked}/></div>
                        </div>
                      )
                    }
                  })}
                </div>
              </Col>
              <Col span="12" className="primary-content">
                <div className="title">待添加成员</div>
                <div className="select-users">
                  {selectUsers.map((user, i) => {
                    if (user._id != folder.createdByUserId && (!folder.authorizedUsers || folder.authorizedUsers.indexOf(user._Id) < 0)) {
                      return (
                        <div key={i} onClick={this.handleSwitchSelectUser(user)}>
                          <div className="avatar">
                            {!user ? (
                              <div className="avatar-box loading"></div>
                            ) : (
                              <div className="avatar-box">
                                {user.profile && user.profile.avatar ? (
                                  <img className="image" src={user.profile.avatar + '!avatar'}/>
                                ) : (
                                  <div className="text">{user && user.username.substr(0, 1).toLocaleUpperCase()}</div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="name">{user.profile ? user.profile.nickname : user.username}</div>
                          <div className="email">{user.emails[0].address}</div>
                          <div className="status"><Icon type="cross-circle"/></div>
                        </div>
                      )
                    }
                  })}
                </div>
              </Col>
            </Row>
          </div>
          <div className="ant-modal-footer">
            <Button type="ghost" size="large" onClick={() => {this.setState({edit: false, queryUsers: [], selectUsers: []})}}>取消</Button>
            <Button type="primary" size="large">确定</Button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="ant-modal-header">
          <div className="ant-modal-title">成员</div>
        </div>
        <div className="members">
          <MemberItem user={_.find(users, (user) => {return user._id = folder.createdByUserId})} manager={true}/>
        </div>
        <div className="ant-modal-footer">
          <Button type="primary" size="large" onClick={() => {this.setState({edit: true})}}>添加成员</Button>
        </div>
      </div>
    )
  },
})

let memberFolderWrap = null
class $MemberFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  handleClose() {
    ReactDOM.unmountComponentAtNode(memberFolderWrap)
  }
  handleMember(e) {
    e.preventDefault()
    if (!this.state.buttonDisabled) {
      if (!memberFolderWrap) {
        memberFolderWrap = document.createElement('div')
        document.body.appendChild(memberFolderWrap)
      }

      const that = this
      ReactDOM.render(<Modal
        title="" footer=""
        width="620" className="modaol-member-folder"
        visible={true}
        closable={true}
        onCancel={this.handleClose}>
        <Content close={this.handleClose} folder={this.props.folder}/>
      </Modal>, memberFolderWrap, function() {
        that.d = this
      })
    }
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleMember.bind(this)
    return React.cloneElement(children, props)
  }
}

MemberFolder = $MemberFolder
