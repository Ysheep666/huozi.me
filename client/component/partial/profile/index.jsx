const {Message} = Antd

class $Profile extends React.Component {
  handleOpen(e) {
    e.preventDefault()
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleOpen.bind(this)
    return React.cloneElement(children, props)
  }
}

Profile = $Profile
