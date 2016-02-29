const {Link} = ReactRouter

const $Note = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      content: '',
    }
  },
  getMeteorData() {
    Meteor.subscribe('note#detail', this.props.params.id)
    return {
      note: Notes.findOne(this.props.params.id),
    }
  },
  componentWillMount() {
    this.setContent = (message, content) => {
      this.setState({content})
    }

    document.body.className = 'note-wrap'
    PubSub.subscribe('pad text', this.setContent)
    this.intervalSaveContent = setInterval(() => {
      this.handleSaveContent()
    }, 10000)
  },
  componentWillUnmount() {
    this.handleSaveContent()
    document.body.className = ''
    PubSub.unsubscribe(this.setContent)
    clearInterval(this.intervalSaveContent)
  },
  handleSaveContent() {
    const modifier = {}, maxLength = 200, content = this.state.content

    let summary = ''
    if (content.length > maxLength + 10 && content[maxLength] !== '\n') {
      const index = content.substring(maxLength).indexOf('\n')
      if (index < 0) {
        summary = content
      } else {
        summary = content.substring(0, maxLength + index)
      }
    } else {
      summary = content
    }

    if (summary != this.data.note.summary) {
      modifier.summary = summary
    }

    if (!this.data.note.target.complete || this.data.note.target.complete != content.length) {
      modifier['target.complete'] = content.length
    }

    if (!_.isEmpty(modifier)) {
      Meteor.call('updateNote', this.data.note._id, {$set: modifier})
    }
  },
  render() {
    const {location} = this.props
    const {note} = this.data
    return (
      <div className="note">
        {note && (
          <div>
            <NoteHeader note={note} location={location}/>
            <div className="inner content">
              <NoteContainer note={note} content={this.state.content}/>
              <NoteSidebar note={note} content={this.state.content}/>
            </div>
          </div>
        )}
      </div>
    )
  },
})

Note = $Note
