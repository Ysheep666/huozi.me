const {Button} = Antd

class $NoteHeader extends React.Component{
  goToBack(e) {
    e.preventDefault()
    const {location} = this.props
    if (location.state && location.state.backPathname) {
      this.context.router.replace(location.state.backPathname)
    } else {
      this.context.router.replace('/dashboard')
    }
  }
  render() {
    const {note} = this.props
    return (
      <div className="note-header">
        <div className="inner">
          <a className="back" onClick={this.goToBack.bind(this)}><i className="material-icons">keyboard_backspace</i></a>
          <div className="users">
            <Button type="primary">分享</Button>
          </div>
        </div>
      </div>
    )
  }
}

$NoteHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}

NoteHeader = $NoteHeader
