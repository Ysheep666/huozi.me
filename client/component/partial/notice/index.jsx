const {Modal} = Antd

class NoticeContent extends React.Component {
  render() {
    return (
      <div className="notice">
        <div className="not-found">暂无消息通知</div>
      </div>
    )
  }
}

let noticeModalWrap = null
class $Notice extends React.Component {
  handleModalClose() {
    ReactDOM.unmountComponentAtNode(noticeModalWrap)
  }
  handleModal(e) {
    e.preventDefault()
    this.props.closeNoticePopover(false)

    setTimeout(() => {
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
        onCancel={this.handleModalClose.bind(this)}>
        <NoticeContent/>
      </Modal>, noticeModalWrap, function() {
        that.d = this
      })
    }, 50)
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleModal.bind(this)
    return React.cloneElement(children, props)
  }
}

Notice = $Notice
