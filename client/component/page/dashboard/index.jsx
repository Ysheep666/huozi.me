const {QueueAnim} = Antd

class $Dashboard extends React.Component {
  render() {
    return (
      <QueueAnim className="dashboard" animConfig={{opacity:[1, 0]}}>
        <div className="dashboard-wrap" key="dashboard">
          <CreateNote>
            <a className="item add-btn">
              <div className="title">新建文档</div>
            </a>
          </CreateNote>
        </div>
      </QueueAnim>
    )
  }
}

Dashboard = $Dashboard
