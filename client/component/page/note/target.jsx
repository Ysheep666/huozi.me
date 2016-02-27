const {Progress, Dropdown, Icon, Menu, InputNumber, Message} = Antd

class $NoteTarget extends React.Component{
  handleChange(target) {
    Meteor.call('updateNote', this.props.note._id, {target}, (error) => {
      if (!error) {
        this.setState({edit: false})
      } else {
        Message.error('更改目标失败，请等待一会再试！')
      }
    })
  }
  render() {
    const target = this.props.note.target || {type: 'about', length: ''}
    const targetTypes = [{k: 'about', v: '大约'}, {k: 'least', v: '至少'}, {k: 'most', v: '最多'}]
    const progressPercent = (!!target.length && target.length > 0) ? this.props.content.length * 100 / target.length : 0

    if (!target.length) {
      target.length = ''
    }

    let status = null
    if (!!target.length && target.length > 0 ) {
      if (progressPercent < 100) {
        status = 'start'
      }

      if ((target.type == 'about' && progressPercent >= 100 && progressPercent < 120) || (target.type == 'least' && progressPercent >= 100) || (target.type == 'most' && progressPercent == 100)) {
        status = 'done'
      }

      if ((target.type == 'about' && progressPercent >= 120) || (target.type == 'most' && progressPercent > 100)) {
        status = 'surplus'
      }
    }

    return (
      <div className={ClassNames({
        'note-target': true,
        'start': status == 'start',
        'done': status == 'done',
        'surplus': status == 'surplus',
      })}>
        <div className="circle">
          <Progress.Circle percent={progressPercent > 100 ? 100 : progressPercent} width={200} strokeWidth={6} format={() => null}/>
          <div className="circle-text">
            {status == null && (
              <div className="circle-text-inner">
                <span>无</span>
                <h3>目标</h3>
                <span>设置</span>
              </div>
            )}
            {status == 'start' && (
              <div className="circle-text-inner">
                <span>已经完成</span>
                <h3>{this.props.content.length}</h3>
                <span>个字符</span>
              </div>
            )}
            {status == 'done' && (
              <div className="circle-text-inner">
                <span>太棒了！</span>
                <h3>{this.props.content.length}</h3>
                <span>个字符</span>
              </div>
            )}
            {status == 'surplus' && (
              <div className="circle-text-inner">
                <span>额~</span>
                <h3>{this.props.content.length}</h3>
                <span>个字符</span>
              </div>
            )}
          </div>
        </div>
        <div form={this.props.form} className="note-target-setting">
          <span>共计 </span>
          <Dropdown overlay={(
            <Menu>
              {targetTypes.map((type, i) => {
                return (
                  <Menu.Item key={i}>
                    <a onClick={() => {this.handleChange({type: type.k, length: target.length})}}>{type.v}</a>
                  </Menu.Item>
                )
              })}
            </Menu>
          )} trigger={['click']}>
            <a className="ant-dropdown-link">{_.find(targetTypes, (v) => {return v.k == target.type})['v']}<Icon type="down"/></a>
          </Dropdown>
          <InputNumber value={target.length} onChange={(length) => {this.handleChange({type: target.type, length: length || null})}}/>
          <span>个字符</span>
        </div>
      </div>
    )
  }
}

NoteTarget = $NoteTarget
