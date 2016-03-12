const {Link} = ReactRouter

const $Note = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      content: '',
    }
  },
  getMeteorData() {
    const {id} = this.props.params
    Meteor.subscribe('note#detail', id)

    const note = Notes.findOne(id)
    const folder = note && note.folderId ? Folders.findOne(note.folderId) : null
    return {note, folder}
  },
  componentWillMount() {
    this.setContent = (message, content) => {
      this.setState({content})
    }

    document.body.className = 'note-wrap'
    PubSub.subscribe('pad text', this.setContent)
    this.intervalSaveContent = setInterval(() => {this.handleSaveContent()}, 10000)
  },
  componentWillUnmount() {
    this.handleSaveContent()
    document.body.className = ''
    PubSub.unsubscribe(this.setContent)
    clearInterval(this.intervalSaveContent)
  },
  handleSaveContent() {
    const {content} = this.state
    const modifier = {}, summary = content.substring(0, 200)
    if (summary != this.data.note.summary) {
      modifier.summary = summary
    }

    if (this.data.note.target.length && this.data.note.target.complete != content.length) {
      modifier['target.complete'] = content.length
    }

    if (!_.isEmpty(modifier)) {
      Meteor.call('updateNote', this.data.note._id, {$set: modifier})
    }
  },
  render() {
    const {location} = this.props
    const {note, folder} = this.data
    const isMember = (note && note.isMember(Meteor.userId())) || (folder && folder.isMember(Meteor.userId()))
    return (
      <div className="note">
        {isMember && (
          <div>
            <NoteHeader note={note} folder={folder} location={location}/>
            <div className="inner content">
              <NoteContainer note={note} content={this.state.content}/>
              <NoteSidebar note={note} folder={folder} content={this.state.content}/>
            </div>
          </div>
        )}
      </div>
    )
  },
})

Note = $Note
