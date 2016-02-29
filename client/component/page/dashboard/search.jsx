const {Link} = ReactRouter
const {Input} = Antd

class $DashboardSearch extends React.Component {
  handleSearch(e) {
    e.preventDefault()
  }
  render() {
    return (
      <div className="dashboard-search">
        <div className="dashboard-search-box">
          <i className="material-icons">search</i>
          <Input type="text" placeholder="搜索文档..."/>
        </div>
      </div>
    )
  }
}

DashboardSearch = $DashboardSearch
