const {Message} = Antd

class $Editor extends React.Component {
  componentDidMount() {
    const id = this.props.note._id
    const codeMirror = CodeMirror(this.refs.editor, {
      mode: 'markdown',
      lineWrapping: true,
      extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'}
    })

    const initialize = () => {
      this.wildpad = new StartedPad(this.ref.child(id), codeMirror, {
        userId: Meteor.userId()
      })

      this.wildpad.on('ready', () => {
        PubSub.publish('pad text', this.wildpad.getText())
      })

      this.wildpad.on('synced', () => {
        PubSub.publish('pad text', this.wildpad.getText())
      })

      PubSub.subscribe('scroll to title', this.handleScrollTitle.bind(this))
    }

    this.ref = new Wilddog(Meteor.settings.public.wilddog.url + '/notes')
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
  handleScrollTitle(message, data) {
    let $el, index = 0
    const headers = this.wildpad.$cmWrapper.find('.cm-header')
    
    for (let i = 0; i < headers.length; i++) {
      const el = $(headers[i]).is('pre') ? $(headers[i]) : $(headers[i]).closest('pre')
      const text = el.text().replace(/#/g, '').trim()
      if (data.text == text) {
        if (data.index == index) {
          $el = el
          break
        } else {
          index++
        }
      }
    }
    
    $(window).scrollTop($el.position().top + 20)
  }
  render() {
    return (
      <div ref="editor" className="editor"></div>
    )
  }
}

Editor = $Editor
