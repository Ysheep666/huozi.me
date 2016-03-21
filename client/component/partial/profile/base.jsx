const {Row, Col, Upload, Button, Form, Input, Radio, DatePicker, Message} = Antd

class $ProfileBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upload: {
        url: props.user.profile && props.user.profile.avatar ? props.user.profile.avatar : '',
        host: '',
        data: {}
      },
      buttonDisabled: false
    }
  }
  handleBeforeUpload(file) {
    const p = new Promise((resolve, reject) => {
      Meteor.call('getQiniuToken', 'started-avatar', (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })

    return p.then((data) => {
      this.setState({upload: Object.assign({}, this.state.upload, {
        host: data.host,
        data: {
          token: data.token
        }
      })})
      return
    })
  }
  uploadPicture(picture) {
    if (picture.file.status == 'done') {
      const {upload} = this.state
      this.setState({upload: Object.assign({}, upload, {url: upload.host + '/' + picture.file.response.key})})
    }
  }
  validateBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'))
    } else {
      callback()
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const avatar = this.state.upload.url
        const {nickname, sex, description} = values
        const birthday = !values.birthday ? null : moment(values.birthday).format('YYYY-MM-DD')

        this.setState({buttonDisabled: true})
        Users.update(this.props.user._id, {$set: {
          'profile.avatar': avatar || null,
          'profile.nickname': nickname || null,
          'profile.sex': sex || null,
          'profile.birthday': birthday || null,
          'profile.description': description || null,
        }}, (error) => {
          if (!error) {
            this.props.close()
          } else {
            this.setState({buttonDisabled: false})
            Message.error('数据更新失败，请等待一会再试！')
          }
        })
      }
    })
  }
  render() {
    const {upload, buttonDisabled} = this.state
    const {user} = this.props
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <div className="profile-base">
        <Row>
          <Col span="8">
            <div className="side">
              <Upload
                action="http://upload.qiniu.com"
                accept="image/*"
                data={upload.data}
                beforeUpload={this.handleBeforeUpload.bind(this)}
                onChange={this.uploadPicture.bind(this)}>
                <div className="picture">
                  <i className="material-icons">person</i>
                  <div className="image" style={{
                    backgroundImage: ((upload.url && upload.url != '') ? `url(${upload.url}!avatar)` : null)
                  }}></div>
                </div>
                <div className="exp">最大10MB。<br/>格式为JPG，PNG，GIF。</div>
                <Button type="primary">点击上传</Button>
              </Upload>
            </div>
          </Col>
          <Col span="12">
            <Form form={this.props.form} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <Form.Item label="昵称：">
                <Input type="text" name="nickname" placeholder="昵称" {...getFieldProps('nickname', {initialValue: user.profile && user.profile.nickname ? user.profile.nickname : ''})}/>
              </Form.Item>
              <Form.Item label="性别：">
                <Radio.Group {...getFieldProps('sex', {initialValue: user.profile && user.profile.sex ? user.profile.sex : null})}>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="出生年月：">
                <DatePicker
                  {...getFieldProps('birthday', {
                    initialValue: user.profile && user.profile.birthday ? user.profile.birthday : null,
                    rules: [
                      {validator: this.validateBirthday.bind(this)}
                    ]
                  })}
                />
              </Form.Item>
              <Form.Item label="个性签名：">
                <Input type="textarea" placeholder="个性签名" name="textarea" rows="3"
                  {...getFieldProps('description', {
                    initialValue: user.profile && user.profile.description ? user.profile.description : '',
                    rules: [
                      {max: 30, message: '个性签名不能超过 30 个字符'},
                    ],
                  })}/>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <div className="profile-footer">
          <Button type="ghost" size="large" onClick={this.props.close}>取消</Button>
          <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)} disabled={buttonDisabled}>确定</Button>
        </div>
      </div>
    )
  }
}

ProfileBase = Form.create()($ProfileBase)
