class $Editor extends React.Component {
  componentDidMount() {
    this.adapter = new EditorAdapter(this.refs.editor)
  }
  componentWillUnmount() {
    this.adapter = null
  }
  render() {
    return (
      <div ref="editor"></div>
    )
  }
}

Editor = $Editor
