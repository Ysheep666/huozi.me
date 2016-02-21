const {QueueAnim, Modal} = Antd

const $Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {chose} = this.props.params
    const name = ({
      '': '全部',
      'schedule': '最近7天',
      'star': '收藏',
      'archive': '归档',
    })[chose || '']

    const label = ({
      '': 'apps',
      'schedule': 'schedule',
      'star': 'star',
      'archive': 'archive',
    })[chose || ''] || 'book'

    if (name) {
      return {chose: {name, label, isDefault: true}}
    }

    Meteor.subscribe('folder#detail', chose)
    return {
      chose: Folders.findOne(chose) || {},
    }
  },
  render() {
    const {location} = this.props
    const {chose} = this.data
    return (
      <QueueAnim className="dashboard" animConfig={{opacity:[1, 0]}}>
        <div className="dashboard-wrap" key="dashboard">
          <DashboardSidebar/>
          <div className="content">
            <DashboardHeader chose={chose}/>
            <DashboardPanels chose={chose} location={location}/>
          </div>
          <Modal/>
        </div>
      </QueueAnim>
    )
  },
})

Dashboard = $Dashboard
