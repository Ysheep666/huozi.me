const {Message} = Antd

class $CreateNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  handleCreate(e) {
    e.preventDefault()
    if (!this.state.buttonDisabled) {
      this.setState({buttonDisabled: true})
      Meteor.call('createNote', (error, result) => {
        this.setState({buttonDisabled: false})
        if (error) {
          Message.error('新建文档失败，请等待一会再试！')
        } else {
          this.context.router.replace('/notes/' + result)
        }
      })
    }
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleCreate.bind(this)
    return React.cloneElement(children, props)
  }
}

$CreateNote.contextTypes = {
  router: React.PropTypes.object.isRequired
}

CreateNote = $CreateNote
