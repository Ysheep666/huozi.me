const {Link} = ReactRouter
const {QueueAnim, Progress} = Antd

$DashboardPanels = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('user-note#list')
    return {
      notes: (() => {
        let query = {}
        const {chose} = this.props
        if (chose.isDefault && chose.label == 'apps') {
          query = {}
        }

        if (chose.isDefault && chose.label == 'schedule') {
          const date = moment().subtract(7, 'days').toDate()
          query = {'note.createdAt': {$gte: date}}
        }

        if (chose.isDefault && chose.label == 'star') {
          query = {'note.star': true}
        }

        if (chose.isDefault && chose.label == 'archive') {
          query = {'isArchive': true}
        }

        if (!chose.isDefault && chose._id) { query = {'folderId': chose._id} }

        return _.isEmpty(chose) && _.isEmpty(query) ? [] : UserNotes.find(query).fetch()
      })(),
    }
  },
  render() {
    const {location, chose} = this.props
    const {notes} = this.data
    return (
      <div className="dashboard-panels">
        <QueueAnim>
          {(!chose.isDefault || chose.label != 'archive') && (
            <CreateNote chose={chose} location={location}>
              <a className="item add-btn">
                <div className="thumb">
                  <i className="add-icon material-icons">add</i>
                </div>
                <div className="title">新建文档</div>
              </a>
            </CreateNote>
          )}
          {notes.map((model, i) => {
            const {note} = model
            const progressStatus = !!note.target.length ? Utils.targetStatus(note.target.complete || 0, note.target) : false
            return (
              <Link className="item" to={{pathname: '/notes/' + note._id, state: {backPathname: location.pathname}}} key={i}>
                <div className="thumb">
                  <div className="modified">{moment(note.updatedAt || note.createdAt).fromNow()}</div>
                  <div className="summary">
                    {note.summary}
                  </div>
                  {note.star && (
                    <div className="status">
                      <i className="material-icons">star</i>
                    </div>
                  )}
                  {progressStatus && (
                    <div className={ClassNames({
                      'note-smaill-progress': true,
                      'start': progressStatus.status == 'start',
                      'done': progressStatus.status == 'done',
                      'surplus': progressStatus.status == 'surplus',
                    })}>
                      <Progress.Circle percent={progressStatus.progressPercent > 100 ? 100 : progressStatus.progressPercent} width={18} format={() => null}/>
                    </div>
                  )}
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
