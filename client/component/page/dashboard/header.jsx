const {Popover, Modal} = Antd

class Notice extends React.Component {
  render() {
    return (
      <div className="notice">
        <div className="not-found">暂无消息通知</div>
      </div>
    )
  }
}

let noticeModalWrap = null
class $DashboardHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeVisible: false
    }
  }
  handleNoticeVisibleChange(noticeVisible) {
    this.setState({noticeVisible})
  }
  handleNoticeModalClose() {
    ReactDOM.unmountComponentAtNode(noticeModalWrap)
  }
  handleNoticeModal(e) {
    e.preventDefault()
    this.handleNoticeVisibleChange(false)

    if (!noticeModalWrap) {
      noticeModalWrap = document.createElement('div')
      document.body.appendChild(noticeModalWrap)
    }

    const that = this
    ReactDOM.render(<Modal
      title="消息通知" footer="" width="640"
      className="modaol-notice" transitionName="fade"
      visible={true}
      closable={true}
      onCancel={this.handleNoticeModalClose.bind(this)}>
      <Notice/>
    </Modal>, noticeModalWrap, function() {
      that.d = this
    })
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
                <a onClick={this.handleNoticeModal.bind(this)}>查看全部 »</a>
              </div>
            </div>
          )} title="消息通知" overlayClassName="popover-notice" trigger="click" placement="bottomRight" visible={this.state.noticeVisible} onVisibleChange={this.handleNoticeVisibleChange.bind(this)}>
            <a><i className="material-icons">notifications_none</i></a>
          </Popover>
          {!chose.isDefault && (<a><i className="material-icons">more_vert</i></a>)}
        </div>
        <DashboardSearch chose={chose} search={search} handleSearchChange={handleSearchChange}/>
      </div>
    )
  }
}

DashboardHeader = $DashboardHeader
