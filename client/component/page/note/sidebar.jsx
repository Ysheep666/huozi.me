const {QueueAnim, Tabs, Message} = Antd
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
    const {note} = this.props
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
              <a><i className="material-icons">more_vert</i></a>
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
