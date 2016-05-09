const {Message} = Antd

class $Editor extends React.Component {
  componentDidMount() {
    const id = this.props.note._id
    const codeMirror = CodeMirror(this.refs.editor, {
      mode: 'markdown',
      lineWrapping: true,
      extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'}
    })

    this.insertText = (message, content) => {
      if (content) {
        this.wildpad.insertTextAtCursor(content)
      }
    }

    this.scrollTitle = (message, data) => {
      let $el, index = 0
      const headers = this.wildpad.$cmWrapper.find('.cm-header')
      for (let i = 0; i < headers.length; i++) {
        const $header = $(headers[i])
        const el = $header.is('pre') ? $header : $header.closest('pre')
        if (!($header.text().indexOf('#') < 0)) {
          if (data.text == el.text().replace(/#/g, '').trim()) {
            if (data.index == index) {
              $el = el
              break
            } else {
              index++
            }
          }
        }
      }
      $(window).scrollTop($el.position().top + 20)
    }

    const initialize = () => {
      this.wildpad = new StartedPad(this.ref.child(id), codeMirror, {
        userId: Meteor.userId()
      })

      this.wildpad.codeMirror_.on('change', () => {
        PubSub.publish('pad text', this.wildpad.codeMirror_.getValue().replace(new RegExp('\uE000', 'g'), ''))
      })

      PubSub.subscribe('insert text', this.insertText)
      PubSub.subscribe('scroll to title', this.scrollTitle)
    }

    this.ref = new Wilddog(Meteor.settings.public.wilddog.url + '/notes')
    if (this.ref.getAuth()) {
      initialize()
    } else {
      Meteor.call('getWilddogToken', (error, data) => {
        if (error) {
          Message.error('获取 Token 失败！')
        } else {
          this.ref.authWithCustomToken(data.token, (error, authData) => {
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
    PubSub.unsubscribe(this.insertText)
    PubSub.unsubscribe(this.scrollTitle)
    setTimeout(() => {
      this.wildpad = null
      this.ref = null
    }, 0)
  }
  render() {
    const className = ClassNames({
      [this.props.className]: this.props.className,
      'editor': true,
      'needsclick': true,
    })

    return (
      <div ref="editor" className={className}></div>
    )
  }
}

Editor = $Editor
