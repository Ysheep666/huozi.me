const {Link} = ReactRouter

const $Note = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      windowWidth: 0,
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

    this.setWindowWidth = () => {
      this.setState({windowWidth: $(window).width()})
    }

    document.body.className = 'note-wrap'
    PubSub.subscribe('pad text', this.setContent)
    this.intervalSaveContent = setInterval(() => {this.handleSaveContent()}, 10000)

    this.setWindowWidth()
    $(window).bind('resize', this.setWindowWidth)
  },
  componentWillUnmount() {
    this.handleSaveContent()
    document.body.className = ''
    PubSub.unsubscribe(this.setContent)
    clearInterval(this.intervalSaveContent)
    $(window).unbind('resize', this.setWindowWidth)
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
    const {windowWidth} = this.state
    const isMember = (note && note.isMember(Meteor.userId())) || (folder && folder.isMember(Meteor.userId()))
    const containerHeaderStyles = {top: '97px'} , containerStyles = {}, sidebarStyles = {}
    if (windowWidth > 1276) {
      containerStyles.width = sidebarStyles.paddingLeft = '752px'
      containerHeaderStyles.left = 'initial'
      sidebarStyles.left = sidebarStyles.right = (windowWidth - 1196) / 2 + 'px'
    } else if (windowWidth > 900) {
      containerHeaderStyles.width = containerStyles.width = sidebarStyles.paddingLeft = (windowWidth - 524) + 'px'
      containerHeaderStyles.left = sidebarStyles.left = sidebarStyles.right = '40px'
    } else {
      containerHeaderStyles.top = '80px'
    }
    return (
      <div className="note">
        {isMember && (
          <div>
            <NoteHeader note={note} folder={folder} location={location}/>
            <div className="inner content">
              <NoteContainer note={note} content={this.state.content} headerStyle={containerHeaderStyles} style={containerStyles}/>
              <NoteSidebar note={note} folder={folder} content={this.state.content} location={location} style={sidebarStyles}/>
            </div>
          </div>
        )}
      </div>
    )
  },
})

Note = $Note
