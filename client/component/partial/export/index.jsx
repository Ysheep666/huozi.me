const {Modal, Message} = Antd

class $Content extends React.Component {
  constructor(props) {
    super(props)
  }
  handleExportPdf(e) {
    e.preventDefault()
    const blob = new Blob(['a'], {type: 'application/pdf'})
    saveAs(blob, 'x.pdf')
  }
  render() {
    return (
      <div>
        <a onClick={this.handleExportPdf.bind(this)}>
          <i className="material-icons">picture_as_pdf</i>
          <div>PDF</div>
        </a>
      </div>
    )
  }
}

const Content = $Content

let exportWrap = null
class $Export extends React.Component {
  constructor(props) {
    super(props)
    this.state = {buttonDisabled: false}
  }
  handleClose() {
    ReactDOM.unmountComponentAtNode(exportWrap)
  }
  handleExport(e) {
    e.preventDefault()
    if (!this.state.buttonDisabled) {
      if (!exportWrap) {
        exportWrap = document.createElement('div')
        document.body.appendChild(exportWrap)
      }

      const that = this
      ReactDOM.render(<Modal
        title="导出" footer=""
        width="360" className="modaol-export"
        visible={true}
        closable={true}
        onCancel={this.handleClose}>
        <Content close={this.handleClose}/>
      </Modal>, exportWrap, function() {
        that.d = this
      })
    }
  }
  render() {
    const {children, ...props} = this.props
    props.onClick = this.handleExport.bind(this)
    return React.cloneElement(children, props)
  }
}

Export = $Export
