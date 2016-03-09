const {Row, Col, Checkbox, Icon, Input, Button, Modal, Popconfirm, Message} = Antd

class MemberItem extends React.Component {
  constructor(props) {
    super(props)
  }
  handleDeleteMember() {
    this.props.deleteMember(this.props.user._id)
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
            <Col span="4" className="status">
              <span className="text">成员</span>
              <Popconfirm title="确认移除成员？" onConfirm={this.handleDeleteMember.bind(this)}>
                <Icon type="cross-circle" className="button"/>
              </Popconfirm>
            </Col>
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
  handleDeleteMember(userId) {
    const {folder} = this.props
    Meteor.call('updateFolder', folder._id, {$pull: {authorizedUsers: userId}}, (error, result) => {
      if (error) {
        Message.error('移除成员失败，请等待一会再试！')
      }
    })
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
  handleSubmit(e) {
    e.preventDefault()
    const {selectUsers, buttonDisabled} = this.state
    const {folder} = this.props
    if (!this.state.buttonDisabled && selectUsers.length) {
      const selectUserIds = _.pluck(selectUsers, '_id')
      this.setState({buttonDisabled: true})
      Meteor.call('updateFolder', folder._id, {$addToSet: {
        authorizedUsers: {
          $each: selectUserIds
        }
      }}, (error, result) => {
        this.setState({buttonDisabled: false})
        if (error) {
          Message.error('共享文件夹失败，请等待一会再试！')
        } else {
          this.props.close()
          setTimeout(() => {
            this.setState({edit: false, queryUsers: [], selectUsers: []})
          }, 100)
        }
      })
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
                    if (user._id != folder.createdByUserId && (!folder.authorizedUsers || folder.authorizedUsers.indexOf(user._id) < 0)) {
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
            <Button type="primary" size="large" onClick={this.handleSubmit} disabled={!selectUserIds.length || buttonDisabled}>确定</Button>
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
          <MemberItem user={_.find(users, (user) => {return user._id == folder.createdByUserId})} manager={true}/>
          {users.map((user, i) => {
            if (user._id != folder.createdByUserId) {
              return (<MemberItem key={i} user={user} manager={false} deleteMember={this.handleDeleteMember}/>)
            }
          })}
        </div>
        <div className="ant-modal-footer">
          <Button type="primary" size="large" onClick={() => {this.setState({edit: true})}}>添加成员</Button>
        </div>
      </div>
    )
  },
})

MemberFolder = Content
