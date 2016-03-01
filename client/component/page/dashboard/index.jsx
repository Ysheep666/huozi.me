const {QueueAnim, Modal} = Antd

const $Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      search: '',
    }
  },
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.chose != this.props.params.chose) {
      this.setState({search: ''})
    }
  },
  render() {
    const {chose} = this.data
    const {search} = this.state
    return (
      <QueueAnim className="dashboard" animConfig={{opacity:[1, 0]}}>
        <div className="dashboard-wrap" key="dashboard">
          <DashboardSidebar/>
          <div className="content">
            <DashboardHeader chose={chose} search={search} handleSearchChange={(e) => {this.setState({search: e.target.value})}}/>
            <DashboardPanels location={this.props.location} chose={chose} search={search}/>
          </div>
          <Modal/>
        </div>
      </QueueAnim>
    )
  },
})

Dashboard = $Dashboard
