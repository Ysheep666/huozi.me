const {Affix, Tooltip} = Antd

class $NoteContainer extends React.Component{
  render() {
    const {note} = this.props
    return (
      <div className="note-container">
        <Affix offset={97} affixClassName="note-container-header">
          <div className="actions">
            <div className="tools">
              <Tooltip placement="bottom" title="上传图片">
                <a><i className="material-icons">insert_photo</i></a>
              </Tooltip>
              <Tooltip placement="bottom" title="上传附件">
                <a><i className="material-icons">attach_file</i></a>
              </Tooltip>
            </div>
          </div>
        </Affix>
        <Editor note={note}/>
      </div>
    )
  }
}

NoteContainer = $NoteContainer
