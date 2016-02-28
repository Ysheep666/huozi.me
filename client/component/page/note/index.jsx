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
    document.body.className = 'note-wrap'
    PubSub.subscribe('pad text', this.initializeContent)
  },
  componentWillUnmount() {
    document.body.className = ''
    PubSub.unsubscribe(this.initializeContent)
  },
  initializeContent(message, content) {
    this.setState({content})
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
