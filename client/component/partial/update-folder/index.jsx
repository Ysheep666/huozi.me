const {Form, Input, Button, Modal, Message} = Antd

class $Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: false
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {folder} = this.props
        const {name} = values
        this.setState({buttonDisabled: true})
        Meteor.call('updateFolder', folder._id, {$set: {name}}, (error, result) => {
          this.setState({buttonDisabled: false})
          if (error) {
            Message.error('重命名文件夹失败，请等待一会再试！')
          } else {
            this.props.close()
          }
        })
      }
    })
  }
  render() {
    const {buttonDisabled} = this.state
    const {folder} = this.props
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
        <Form.Item label="名称：" hasFeedback>
          <Input
            type="text" name="name" placeholder="名称"
            {...getFieldProps('name', {
              initialValue: folder.name,
              rules: [
                {required: true, whitespace: true, message: '名称不能为空'},
              ],
            })}/>
        </Form.Item>
        <div className="ant-modal-footer">
          <Button type="ghost" size="large" onClick={this.props.close}>取消</Button>
          <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)} disabled={buttonDisabled}>确定</Button>
        </div>
      </Form>
    )
  }
}

const Content = Form.create()($Content)

let updateFolderWrap = null
class $UpdateFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  handleClose() {
    ReactDOM.unmountComponentAtNode(updateFolderWrap)
  }
  handleUpdate(e) {
    e.preventDefault()
    if (!this.state.buttonDisabled) {
      if (!updateFolderWrap) {
        updateFolderWrap = document.createElement('div')
        document.body.appendChild(updateFolderWrap)
      }

      const that = this
      ReactDOM.render(<Modal
        title="重命名文件夹" footer=""
        width="360" className="modaol-update-folder"
        visible={true}
        closable={true}
        onCancel={this.handleClose}>
        <Content close={this.handleClose} folder={this.props.folder}/>
      </Modal>, updateFolderWrap, function() {
        that.d = this
      })
    }
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleUpdate.bind(this)
    return React.cloneElement(children, props)
  }
}

UpdateFolder = $UpdateFolder
