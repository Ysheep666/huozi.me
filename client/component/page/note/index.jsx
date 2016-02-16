const {QueueAnim} = Antd

class $Note extends React.Component {
  render() {
    return (
      <QueueAnim className="note">
        <div className="note-wrap" key="note">
          detail
          <Editor/>
        </div>
      </QueueAnim>
    )
  }
}

Note = $Note
