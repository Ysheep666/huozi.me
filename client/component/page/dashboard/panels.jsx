const {Link} = ReactRouter
const {QueueAnim} = Antd

$DashboardPanels = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('user-note#list')
    return {
      notes: UserNotes.find().fetch(),
    }
  },
  render() {
    const {location} = this.props
    const {notes} = this.data
    return (
      <div className="dashboard-panels">
        <QueueAnim>
          <CreateNote>
            <a className="item add-btn">
              <div className="thumb">
                <i className="add-icon material-icons">add</i>
              </div>
              <div className="title">新建文档</div>
            </a>
          </CreateNote>
          {notes.map((model, i) => {
            const {note} = model
            return (
              <Link className="item" to={{pathname: '/notes/' + note._id, state: {backPathname: location.pathname}}} key={i}>
                <div className="thumb">
                </div>
                <div className="title">{note.name}</div>
              </Link>
            )
          })}
        </QueueAnim>
      </div>
    )
  },
})

DashboardPanels = $DashboardPanels
