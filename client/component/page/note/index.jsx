const {Link} = ReactRouter
const {QueueAnim} = Antd

const $Note = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('note#detail', this.props.params.id)
    return {
      note: Notes.findOne(this.props.params.id),
    }
  },
  componentWillMount() {
    document.body.className = 'note-wrap'
  },
  componentWillUnmount(nextProps) {
    document.body.className = ''
  },
  render() {
    const {location} = this.props
    const {note} = this.data
    return (
      <QueueAnim className="note">
        {note && (
          <div>
            <NoteHeader note={note} location={location}/>
            <div className="inner content">
              <NoteContainer note={note}/>
            </div>
          </div>
        )}
      </QueueAnim>
    )
  },
})

Note = $Note
