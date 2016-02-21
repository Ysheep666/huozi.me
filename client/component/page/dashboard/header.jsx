class $DashboardHeader extends React.Component{
  render() {
    const {chose} = this.props
    return (
      <div className="dashboard-header">
        <h1><i className="material-icons">{chose.isDefault ? chose.label : 'book'}</i>{chose.name}</h1>
        <div className="actions">
          <a><i className="material-icons">notifications_none</i></a>
          {!chose.isDefault && (<a><i className="material-icons">more_vert</i></a>)}
        </div>
        <DashboardSearch chose={chose}/>
      </div>
    )
  }
}

DashboardHeader = $DashboardHeader
