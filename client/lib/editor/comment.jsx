const {Form, Input, Button, Message} = Antd

class CommentItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {confirm: false}
  }
  handleDeleteConfirm(e) {
    e.preventDefault()
    this.setState({confirm: true})
  }
  handleDeleteCancel (e) {
    e.preventDefault()
    this.setState({confirm: false})
  }
  render() {
    const {comment, handleDelete} = this.props
    return (
      <div onMouseLeave={this.handleDeleteCancel.bind(this)}>
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
          <div className="delete">
            {this.state.confirm ? (
              <span>
                <a onClick={handleDelete}><i className="material-icons">done</i></a>
                <a onClick={this.handleDeleteCancel.bind(this)}><i className="material-icons">clear</i></a>
              </span>
            ) : (
              <a onClick={this.handleDeleteConfirm.bind(this)}><i className="material-icons">delete</i> 删除</a>
            )}
          </div>
        </div>
        <div className="comment-content">
          {comment.content}
        </div>
      </div>
    )
  }
}

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
            if (!this.props.id) {
              this.props.close()
            } else {
              this.props.form.resetFields()
            }
            this.props.callback(result)
          }
        })
      }
    })
  },
  handleDeleteComment(commentId) {
    return (e) => {
      e.preventDefault()
      Meteor.call('deleteComment', commentId || null, (error) => {
        if (!error && commentId == this.props.id) {
          this.props.close()
          this.props.removeComment()
        }
      })
    }
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
              return (<CommentItem key={i} comment={comment} handleDelete={this.handleDeleteComment(comment._id)}/>)
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
