const {Popover, Dropdown, Menu, Modal, Message} = Antd

class $DashboardHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeVisible: false,
      memberVisible: false,
    }
  }
  handleNoticeVisibleChange(noticeVisible) {
    this.setState({noticeVisible})
  }
  handleMemberOpen(e) {
    e.preventDefault()
    this.setState({memberVisible: true})
  }
  handleMemberClose() {
    this.setState({memberVisible: false})
  }
  handleDeleteFolder(e) {
    e.preventDefault()
    const that = this
    const {chose} = this.props
    if (chose.isAdmin(Meteor.userId())) {
      if (chose.members && chose.members.length > 1) {
        Message.error('文件夹成员不为空，不能删除该文件夹！')
        return
      }

      Modal.confirm({
        title: '确认删除文件夹？',
        onOk() {
          Meteor.call('deleteFolder', chose._id, (error) => {
            if (!error) {
              that.context.router.replace('/dashboard')
            } else {
              Message.error('删除文件夹失败！')
            }
          })
        }
      })
    } else {
      Modal.confirm({
        title: '确认退出文件夹共享？',
        onOk() {
          Meteor.call('deleteFolder', chose._id, (error) => {
            if (!error) {
              that.context.router.replace('/dashboard')
            } else {
              Message.error('退出共享失败！')
            }
          })
        }
      })
    }
  }
  render() {
    const {chose, search, handleSearchChange} = this.props
    return (
      <div className="dashboard-header">
        <h1><i className="material-icons">{chose.isDefault ? chose.label : 'book'}</i>{chose.name}</h1>
        <div className="actions">
          <Popover overlay={(
            <div>
              <div className="not-found">没有新通知</div>
              <div className="notice-footer">
                <Notice closeNoticePopover={this.handleNoticeVisibleChange.bind(this)}><a>查看全部 »</a></Notice>
              </div>
            </div>
          )} title="消息通知" overlayClassName="popover-notice" trigger="click" placement="bottomRight" visible={this.state.noticeVisible} onVisibleChange={this.handleNoticeVisibleChange.bind(this)}>
            <a><i className="material-icons">notifications_none</i></a>
          </Popover>
          {!chose.isDefault && (
            <Dropdown overlay={chose._id && chose.isAdmin(Meteor.userId()) ? (
              <Menu>
                <Menu.Item><UpdateFolder folder={chose}><a>重命名</a></UpdateFolder></Menu.Item>
                <Menu.Item><a onClick={this.handleMemberOpen.bind(this)}>共享</a></Menu.Item>
                <Menu.Item><a onClick={this.handleDeleteFolder.bind(this)}>删除文件夹</a></Menu.Item>
              </Menu>
            ) : (
              <Menu>
                <Menu.Item><a onClick={this.handleDeleteFolder.bind(this)}>退出共享</a></Menu.Item>
              </Menu>
            )} trigger={['click']}>
              <a><i className="material-icons">more_vert</i></a>
            </Dropdown>
          )}
        </div>
        <DashboardSearch chose={chose} search={search} handleSearchChange={handleSearchChange}/>
        <Modal title="" footer="" width="620" className="modaol-member-folder" visible={this.state.memberVisible} onCancel={this.handleMemberClose.bind(this)}>
          <MemberFolder visible={this.state.memberVisible} close={this.handleMemberClose.bind(this)} folder={chose}/>
        </Modal>
      </div>
    )
  }
}

$DashboardHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}

DashboardHeader = $DashboardHeader
