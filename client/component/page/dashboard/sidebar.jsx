const {Link} = ReactRouter
const {Message, Popconfirm} = Antd

const $DashboardSidebar = React.createClass({
  mixins: [ReactMeteorData],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getMeteorData() {
    return {
      user: Meteor.user(),
    }
  },
  handleLogout() {
    Meteor.logout((error) => {
      if (error) {
        Message.error('退出失败，请等待一会再试！')
      } else {
        this.context.router.replace('/')
      }
    })
  },
  render() {
    const {user} = this.data
    return (
      <div className="dashboard-sidebar">
        <Link to="/" className="brand"><Logo/></Link>
        <div className="nav">
          <div>
            <div className="m-y">文库</div>
            <ul className="menu">
              <li><Link to="/dashboard" activeClassName="active"><i className="material-icons">apps</i>全部</Link></li>
              <li><Link to="/dashboard/schedule" activeClassName="active"><i className="material-icons">schedule</i>最近7天</Link></li>
              <li><Link to="/dashboard/star" activeClassName="active"><i className="material-icons">star</i>收藏</Link></li>
              <li><Link to="/dashboard/archive" activeClassName="active"><i className="material-icons">archive</i>归档</Link></li>
            </ul>
            <div className="m-y">文件夹<CreateFolder><a href="" className="add-folder"><i className="material-icons">add</i></a></CreateFolder></div>
            <ul className="menu">
              {user && user.profile && user.profile.folders && user.profile.folders.map((folder, i) => {
                return <li key={i}><Link to={'/dashboard/' + folder._id} activeClassName="active"><i className="material-icons">book</i>{folder.name}</Link></li>
              })}
            </ul>
          </div>
        </div>
        <div className="profile">
          <div className="actions">
            <Profile><a href=""><i className="material-icons">settings</i></a></Profile>
            <Popconfirm title="确认退出登录？" onConfirm={this.handleLogout}>
              <a href=""><i className="material-icons">power_settings_new</i></a>
            </Popconfirm>
          </div>
          <Profile>
            <a href="" className="avatar">
              {!user ? (
                <div className="avatar-box loading"></div>
              ) : (
                <div className="avatar-box">
                  {user.profile && user.profile.avatar ? (
                    <img className="image" src={user.profile.avatar + '!avatar'}/>
                  ) : (
                    <div className="text">{user && user.username.substr(0, 1).toLocaleUpperCase()}</div>
                  )}
                </div>
              )}
            </a>
          </Profile>
        </div>
      </div>
    )
  },
})

DashboardSidebar = $DashboardSidebar
