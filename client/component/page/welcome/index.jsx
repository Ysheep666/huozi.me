const {Link} = ReactRouter
const {QueueAnim} = Antd

class $Welcome extends React.Component {
  render() {
    return (
      <QueueAnim className="welcome">
        <div key="welcome">
          <h1><Logo/></h1>
          <h2>专注于写作</h2>
          <div>
            {this.data ? (
              <Link to="/dashboard">立即使用</Link>
            ) : (
              <Link to="/login">立即使用</Link>
            )}
          </div>
        </div>
      </QueueAnim>
    )
  }
}

Welcome = $Welcome
