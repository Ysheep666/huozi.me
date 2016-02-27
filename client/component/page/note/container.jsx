const {Affix, Upload, Tooltip, Message} = Antd

class $NoteContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      imageUpload: {host: '', data: {}},
      fileUpload: {host: '', data: {}},
    }
  }
  handleBeforeImageUpload() {
    const p = new Promise((resolve, reject) => {
      Meteor.call('getQiniuToken', 'started-images', (error, data) => {
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
      PubSub.publish('insert text', `![](${this.state.imageUpload.host}${image.file.response.key})`)
    }
  }
  handleBeforeFileUpload() {
    const p = new Promise((resolve, reject) => {
      Meteor.call('getQiniuToken', 'started-files', (error, data) => {
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
      PubSub.publish('insert text', `[${file.file.name}](${this.state.fileUpload.host}${file.file.response.key})`)
    }
  }
  render() {
    const {note} = this.props
    const {imageUpload, fileUpload} = this.state
    return (
      <div className="note-container">
        <Affix offset={97} affixClassName="note-container-header">
          <div className="actions">
            <div className="tools">
              <Upload className="upload"
                action="http://upload.qiniu.com"
                accept="image/*"
                data={imageUpload.data}
                beforeUpload={this.handleBeforeImageUpload.bind(this)}
                onChange={this.hendleImageUploadChange.bind(this)}>
                <Tooltip placement="bottom" title="上传图片">
                  <a><i className="material-icons">insert_photo</i></a>
                </Tooltip>
              </Upload>
              <Upload className="upload"
                action="http://upload.qiniu.com"
                data={fileUpload.data}
                beforeUpload={this.handleBeforeFileUpload.bind(this)}
                onChange={this.hendleFileUploadChange.bind(this)}>
                <Tooltip placement="bottom" title="上传附件">
                  <a><i className="material-icons">attach_file</i></a>
                </Tooltip>
              </Upload>
            </div>
          </div>
        </Affix>
        <Editor note={note}/>
      </div>
    )
  }
}

NoteContainer = $NoteContainer
