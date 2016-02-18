if (typeof meteorpad === 'undefined') {
  meteorpad = {}
}

class $Editor extends React.Component {
  componentDidMount() {
    const codeMirror = CodeMirror(this.refs.editor, {
      mode: 'markdown',
      lineWrapping: true,
      extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'}
    })

    this.pad = wildpad.wildPad.fromCodeMirror(this.props.noteId, codeMirror, {
      defaultText: 'abc'
    })
  }
  componentWillUnmount() {
    this.pad = null
  }
  render() {
    return (
      <div ref="editor"></div>
    )
  }
}

Editor = $Editor
