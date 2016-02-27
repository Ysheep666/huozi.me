const {QueueAnim, Tabs} = Antd
const {TabPane} = Tabs

class $NoteSidebar extends React.Component{
  render() {
    return (
      <QueueAnim className="note-sidebar-wrap">
        <div className="note-sidebar" key="note-sidebar">
          <Tabs defaultActiveKey="target">
            <TabPane tab="目标" key="target"><NoteTarget note={this.props.note} content={this.props.content}/></TabPane>
            <TabPane tab="目录" key="catalogue"><NoteCatalogue content={this.props.content}/></TabPane>
          </Tabs>
        </div>
      </QueueAnim>
    )
  }
}

NoteSidebar = $NoteSidebar
