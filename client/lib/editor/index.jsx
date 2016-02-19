const {Message} = Antd
const {Wildpad} = wildpad

class $Editor extends React.Component {
  componentDidMount() {
    const {id} = this.props
    const codeMirror = CodeMirror(this.refs.editor, {
      mode: 'markdown',
      lineWrapping: true,
      extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'}
    })

    const initialize = () => {
      this.wildpad = Wildpad.fromCodeMirror(this.ref.child(id), codeMirror, {
        userId: Meteor.userId()
      })
    }

    this.ref = new Wilddog(Meteor.settings.public.wilddog.url)
    if (this.ref.getAuth()) {
      initialize()
    } else {
      Meteor.call('getWilddogToken', (error, token) => {
        if (error) {
          Message.error('获取 Token 失败！')
        } else {
          this.ref.authWithCustomToken(token, (error, authData) => {
            if (error) {
              Message.error('登录 Wilddong 失败！')
            } else {
              initialize()
            }
          })
        }
      })
    }
  }
  componentWillUnmount() {
    this.wildpad.dispose()
    setTimeout(() => {
      this.wildpad = null
      this.ref = null
    }, 0)
  }
  render() {
    return (
      <div ref="editor"></div>
    )
  }
}

Editor = $Editor
