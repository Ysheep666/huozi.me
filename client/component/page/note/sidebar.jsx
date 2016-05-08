const {QueueAnim, Tabs, Dropdown, Menu, Modal, Message} = Antd
const {TabPane} = Tabs

class $NoteSidebar extends React.Component{
  handleStar(e) {
    e.preventDefault()
    Meteor.call('updateNote', this.props.note._id, {$addToSet: {stars: Meteor.userId()}}, (error) => {
      if (error) {
        Message.error('收藏失败，请等待一会再试！')
      }
    })
  }
  handleRemoveStar(e) {
    e.preventDefault()
    Meteor.call('updateNote', this.props.note._id, {$pull: {stars: Meteor.userId()}}, (error) => {
      if (error) {
        Message.error('取消收藏失败，请等待一会再试！')
      }
    })
  }
  handleUndoDeleteNote(e) {
    const {note, location} = this.props
    Meteor.call('updateNote', note._id, {$set: {isArchive: false}}, (error) => {
      if (!error) {
        if (location.state && location.state.backPathname) {
          this.context.router.replace(location.state.backPathname)
        } else {
          this.context.router.replace('/dashboard')
        }
      } else {
        Message.error('还原删除失败！')
      }
    })
  }
  handleDeleteNote(e) {
    e.preventDefault()
    const that = this
    const {note, folder, location} = this.props
    if (note.isAdmin(Meteor.userId()) || (folder && folder.isAdmin(Meteor.userId()))) {
      Modal.confirm({
        title: '确认归档文档？',
        onOk() {
          Meteor.call('updateNote', note._id, {$set: {isArchive: true}}, (error) => {
            if (!error) {
              if (location.state && location.state.backPathname) {
                that.context.router.replace(location.state.backPathname)
              } else {
                that.context.router.replace('/dashboard')
              }
            } else {
              Message.error('归档文档失败！')
            }
          })
        }
      })
    } else {
      Modal.confirm({
        title: '确认退出文档共享？',
        onOk() {
          Meteor.call('updateNote', note._id, {$pull: {members: {userId: Meteor.userId()}}}, (error) => {
            if (!error) {
              if (location.state && location.state.backPathname) {
                that.context.router.replace(location.state.backPathname)
              } else {
                that.context.router.replace('/dashboard')
              }
            } else {
              Message.error('退出共享失败！')
            }
          })
        }
      })
    }
  }
  render() {
    const {note, folder, style} = this.props

    let menu = '', item = ''
    if (note.isArchive) {
      item = (<Menu.Item><a onClick={this.handleUndoDeleteNote.bind(this)}>放回原处</a></Menu.Item>)
    } else if (note.isAdmin(Meteor.userId()) || (folder && folder.isAdmin(Meteor.userId()))) {
      item = (<Menu.Item><a onClick={this.handleDeleteNote.bind(this)}>归档文档</a></Menu.Item>)
    } else {
      item = (<Menu.Item><a onClick={this.handleDeleteNote.bind(this)}>退出共享</a></Menu.Item>)
    }

    menu = (
      <Menu>
        <Menu.Item><Export note={this.props.note} content={this.props.content}><a>导出</a></Export></Menu.Item>
        {item}
      </Menu>
    )

    return (
      <QueueAnim className="note-sidebar-wrap" style={style}>
        <div className="note-sidebar" key="note-sidebar">
          <Tabs defaultActiveKey="target" tabBarExtraContent={(
            <div className="note-sidebar-bar-extra">
              {note.stars && !(note.stars.indexOf(Meteor.userId()) < 0) ? (
                <a onClick={this.handleRemoveStar.bind(this)}><i className="material-icons">star</i></a>
              ) : (
                <a onClick={this.handleStar.bind(this)}><i className="material-icons">star_border</i></a>
              )}
              <Dropdown overlay={menu} trigger={['click']}>
                <a><i className="material-icons">more_vert</i></a>
              </Dropdown>
            </div>
          )}>
            <TabPane tab="目标" key="target"><NoteTarget note={this.props.note} content={this.props.content}/></TabPane>
            <TabPane tab="目录" key="catalogue"><NoteCatalogue content={this.props.content}/></TabPane>
          </Tabs>
        </div>
      </QueueAnim>
    )
  }
}

$NoteSidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

NoteSidebar = $NoteSidebar
