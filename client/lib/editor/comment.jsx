const {Form, Input, Button, Message} = Antd

$EditorComment = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (!this.props.id) {
      return {comments: []}
    }

    Meteor.subscribe('comment#list', this.props.id)
    return {
      comments: Comments.find({}).fetch(),
    }
  },
  getInitialState() {
    return {
      buttonDisabled: false,
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const {content} = values
        this.setState({buttonDisabled: true})
        Meteor.call('createComment', content, this.props.id || null, (error, result) => {
          this.setState({buttonDisabled: false})
          if (error) {
            Message.error('提交数据失败，请等待一会再试！')
          } else {
            this.props.callback(result)
          }
        })
      }
    })
  },
  render() {
    const {comments} = this.data
    const {buttonDisabled} = this.state
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
    return (
      <div className="comment">
        {!!comments.length && (
          <div className="comment-list">
            {comments.map((comment, i) => {
              return (
                <div key={i}>
                  <div className="author">
                    {!comment.user.avatar ? (
                      <div className="font"><i className="material-icons">person</i></div>
                    ) : (
                      <div className="image" style={{backgroundImage: `url(${comment.user.avatar})`}}></div>
                    )}
                  </div>
                  <div className="info">
                    <span className="name">{comment.user.name}</span>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <Form className="comment-input-box" form={this.props.form} onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input type="textarea" rows="2" placeholder="评论..." {...getFieldProps('content', {
              rules: [
                {required: true, message: '评论不能为空！'},
              ],
            })}/>
          </Form.Item>
          <div className="comment-input-box-footer">
            <Button type="ghost" size="small" onClick={this.props.close}>取消</Button>
            <Button type="primary" size="small" onClick={this.handleSubmit} disabled={buttonDisabled}>确定</Button>
          </div>
        </Form>
      </div>
    )
  }
})

EditorComment = Form.create()($EditorComment)
