const {QueueAnim, Tabs, Dropdown, Menu, Message} = Antd
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
  render() {
    const {note, folder} = this.props
    return (
      <QueueAnim className="note-sidebar-wrap">
        <div className="note-sidebar" key="note-sidebar">
          <Tabs defaultActiveKey="target" tabBarExtraContent={(
            <div className="note-sidebar-bar-extra">
              {note.stars && !(note.stars.indexOf(Meteor.userId()) < 0) ? (
                <a onClick={this.handleRemoveStar.bind(this)}><i className="material-icons">star</i></a>
              ) : (
                <a onClick={this.handleStar.bind(this)}><i className="material-icons">star_border</i></a>
              )}
              <Dropdown overlay={(
                <Menu>
                  <Menu.Item><a>导出</a></Menu.Item>
                  {note.isAdmin(Meteor.userId()) || (folder && folder.isAdmin(Meteor.userId())) ? (
                    <Menu.Item><a>归档文档</a></Menu.Item>
                  ) : (
                    <Menu.Item><a>退出共享</a></Menu.Item>
                  )}
                </Menu>
              )} trigger={['click']}>
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

NoteSidebar = $NoteSidebar
