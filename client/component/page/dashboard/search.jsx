const {Link} = ReactRouter
const {Input} = Antd

class $DashboardSearch extends React.Component {
  render() {
    const {search, handleSearchChange} = this.props
    return (
      <div className="dashboard-search">
        <div className="dashboard-search-box">
          <i className="material-icons">search</i>
          <Input type="text" placeholder="搜索文档..." value={search} onChange={handleSearchChange}/>
        </div>
      </div>
    )
  }
}

DashboardSearch = $DashboardSearch
