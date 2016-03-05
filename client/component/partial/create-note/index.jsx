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

      const options = {}, {chose} = this.props
      if (chose.isDefault && chose.label == 'star') {
        options.state = 'star'
      }

      if (!chose.isDefault && chose._id) {
        options.state = 'folder'
        options.value = chose._id
      }

      Meteor.call('createNote', '无标题', options, (error, result) => {
        this.setState({buttonDisabled: false})
        if (error) {
          Message.error('新建文档失败，请等待一会再试！')
        } else {
          this.context.router.replace({pathname: '/notes/' + result, state: {backPathname: this.props.location.pathname}})
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
