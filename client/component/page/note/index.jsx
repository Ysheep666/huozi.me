const {Link} = ReactRouter
const {QueueAnim} = Antd

class $Note extends React.Component {
  render() {
    return (
      <QueueAnim className="note">
        <div className="note-wrap" key="note">
          detail<Link to="/">default</Link>
          <Editor id={this.props.params.id}/>
        </div>
      </QueueAnim>
    )
  }
}

Note = $Note
