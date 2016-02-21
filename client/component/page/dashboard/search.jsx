const {Link} = ReactRouter
const {Input} = Antd

class $DashboardSearch extends React.Component {
  handleSearch(e) {
    e.preventDefault()
  }
  render() {
    return (
      <div className="dashboard-search">
        <form onSubmit={this.handleSearch.bind(this)}>
          <Input type="text" placeholder="搜索文档..."/>
          <button type="submit"><i className="material-icons">search</i></button>
        </form>
      </div>
    )
  }
}

DashboardSearch = $DashboardSearch
