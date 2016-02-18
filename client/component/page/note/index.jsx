const {QueueAnim} = Antd

class $Note extends React.Component {
  render() {
    return (
      <QueueAnim className="note">
        <div className="note-wrap" key="note">
          detail
          <Editor noteId={this.props.params.id}/>
        </div>
      </QueueAnim>
    )
  }
}

Note = $Note
