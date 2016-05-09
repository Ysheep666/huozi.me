const {Affix, Upload, Tooltip, Message} = Antd

class $NoteContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      scrollTop: 0,
      status: 'edit',
      imageUpload: {host: '', data: {}},
      fileUpload: {host: '', data: {}},
    }
  }
  handleBeforeImageUpload() {
    const p = new Promise((resolve, reject) => {
      Meteor.call('getQiniuToken', 'huozi-images', (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })

    return p.then((data) => {
      this.setState({imageUpload: Object.assign({}, this.state.imageUpload, {
        host: data.host,
        data: {
          token: data.token
        }
      })})
      return
    })
  }
  hendleImageUploadChange(image) {
    if (image.file.status == 'error') {
      Message.error('上传图片失败，请稍后再试！')
    }

    if (image.file.status == 'done') {
      PubSub.publish('insert text', `![](${this.state.imageUpload.host}/${image.file.response.key})`)
    }
  }
  handleBeforeFileUpload() {
    const p = new Promise((resolve, reject) => {
      Meteor.call('getQiniuToken', 'huozi-files', (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })

    return p.then((data) => {
      this.setState({fileUpload: Object.assign({}, this.state.fileUpload, {
        host: data.host,
        data: {
          token: data.token
        }
      })})
      return
    })
  }
  hendleFileUploadChange(file) {
    if (file.file.status == 'error') {
      Message.error('上传附件失败，请稍后再试！')
    }

    if (file.file.status == 'done') {
      PubSub.publish('insert text', `[${file.file.name}](${this.state.fileUpload.host}/${file.file.response.key})`)
    }
  }
  componentWillMount() {
    this.setScrollTop = () => {
      this.setState({scrollTop: $(window).scrollTop()})
    }
    $(window).bind('scroll', this.setScrollTop)
  }
  componentWillUnmount() {
    $(window).unbind('scroll', this.setScrollTop)
  }
  render() {
    const {note, content, headerStyle, style} = this.props
    const {scrollTop, status, imageUpload, fileUpload} = this.state
    return (
      <div className="note-container" style={style}>
        <div className={scrollTop == 0 ? 'note-container-header' : 'note-container-header affix'} style={headerStyle}>
          <div className="actions">
            <div className="tools">
              <Upload className="t"
                action="http://upload.qiniu.com"
                accept="image/*"
                data={imageUpload.data}
                notAToClick={true}
                beforeUpload={this.handleBeforeImageUpload.bind(this)}
                onChange={this.hendleImageUploadChange.bind(this)}>
                <Tooltip placement="bottom" title="上传图片">
                  <a className="needsclick"><i className="material-icons">insert_photo</i></a>
                </Tooltip>
              </Upload>
              <Upload className="t"
                action="http://upload.qiniu.com"
                data={fileUpload.data}
                notAToClick={true}
                beforeUpload={this.handleBeforeFileUpload.bind(this)}
                onChange={this.hendleFileUploadChange.bind(this)}>
                <Tooltip placement="bottom" title="上传附件">
                  <a><i className="material-icons">attach_file</i></a>
                </Tooltip>
              </Upload>
              <span className="switch">
                {status == 'edit' ? (
                  <Tooltip placement="bottom" title="预览">
                    <a onClick={(e) => {e.preventDefault();this.setState({status: 'preview'})}}><i className="material-icons">visibility</i></a>
                  </Tooltip>
                ) : (
                  <Tooltip placement="bottom" title="编辑">
                    <a onClick={(e) => {e.preventDefault();this.setState({status: 'edit'})}}><i className="material-icons">visibility_off</i></a>
                  </Tooltip>
                )}
              </span>
            </div>
          </div>
        </div>
        {status == 'edit' ? (
          <Editor note={note}/>
        ) : (
          <NotePreview content={content}/>
        )}
      </div>
    )
  }
}

NoteContainer = $NoteContainer
