const {Modal, Message} = Antd

class $Content extends React.Component {
  constructor(props) {
    super(props)
  }
  handleExportPdf(e) {
    e.preventDefault()
    this.props.close()
    const {pandoc} = Meteor.settings.public
    const {note, content} = this.props
    const hide = Message.loading('正在导出...', 0)
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: `${pandoc.url}/markdownConverterPdf`,
      data: {content},
      success(data){
        setTimeout(() => {
          hide()
          $(`<form action="${pandoc.url}/download/${data.name}"><input type="hidden" name="name" value="${note.name}.pdf"/></form>`).appendTo('body').submit().remove()
        }, 1000)
      },
      error() {
        hide()
        Message.error('导出文件失败！')
      }
    })
  }
  handleExportWord(e) {
    e.preventDefault()
    this.props.close()
    const {pandoc} = Meteor.settings.public
    const {note, content} = this.props
    const hide = Message.loading('正在导出...', 0)
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: `${pandoc.url}/markdownConverterWord`,
      data: {content},
      success(data){
        setTimeout(() => {
          hide()
          $(`<form action="${pandoc.url}/download/${data.name}"><input type="hidden" name="name" value="${note.name}.docx"/></form>`).appendTo('body').submit().remove()
        }, 1000)
      },
      error() {
        hide()
        Message.error('导出文件失败！')
      }
    })
  }
  handleExportEpub(e) {
    e.preventDefault()
    this.props.close()
    const {pandoc} = Meteor.settings.public
    const {note, content} = this.props
    const hide = Message.loading('正在导出...', 0)
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: `${pandoc.url}/markdownConverterEpub`,
      data: {content},
      success(data){
        setTimeout(() => {
          hide()
          $(`<form action="${pandoc.url}/download/${data.name}"><input type="hidden" name="name" value="${note.name}.epub"/></form>`).appendTo('body').submit().remove()
        }, 1000)
      },
      error() {
        hide()
        Message.error('导出文件失败！')
      }
    })
  }
  render() {
    return (
      <div className="export-buttons">
        <a onClick={this.handleExportPdf.bind(this)}>
          <svg viewBox="0 0 1024 1024">
            <path d="M842.016 589.488c-13.648-13.44-43.92-20.56-89.968-21.168-31.184-0.352-68.704 2.4-108.176 7.92-17.68-10.192-35.888-21.296-50.192-34.656-38.464-35.92-70.56-85.776-90.576-140.592 1.296-5.12 2.416-9.616 3.44-14.208 0 0 21.664-123.056 15.936-164.672-0.8-5.712-1.28-7.36-2.8-11.792l-1.888-4.832c-5.888-13.6-17.44-28-35.568-27.2l-10.912-0.336c-20.208 0-36.656 10.336-40.992 25.776-13.136 48.432 0.416 120.896 24.976 214.736l-6.288 15.28c-17.584 42.88-39.632 86.064-59.072 124.16l-2.528 4.96c-20.464 40.032-39.024 74.032-55.856 102.816l-17.376 9.184c-1.264 0.672-31.04 16.416-38.032 20.64-59.264 35.376-98.528 75.536-105.04 107.424-2.08 10.176-0.528 23.184 10.016 29.216l16.8 8.464c7.296 3.648 14.976 5.504 22.848 5.504 42.208 0 91.2-52.576 158.704-170.368 77.936-25.376 166.656-46.464 244.416-58.096 59.264 33.376 132.144 56.544 178.144 56.544 8.176 0 15.216-0.784 20.928-2.288 8.816-2.336 16.256-7.376 20.8-14.192 8.928-13.44 10.736-31.936 8.32-50.88-0.72-5.616-5.216-12.576-10.064-17.328zM211.648 814.048c7.696-21.04 38.16-62.64 83.2-99.552 2.832-2.304 9.808-8.832 16.192-14.896-47.104 75.12-78.64 105.072-99.408 114.464zM478.432 199.68c13.568 0 21.28 34.192 21.92 66.256s-6.864 54.56-16.16 71.216c-7.696-24.656-11.424-63.504-11.424-88.896 0 0-0.56-48.56 5.664-48.56l0 0zM398.848 637.488c9.456-16.912 19.28-34.752 29.328-53.68 24.496-46.32 39.952-82.56 51.472-112.352 22.912 41.68 51.44 77.12 84.992 105.504 4.192 3.536 8.624 7.104 13.28 10.656-68.208 13.488-127.168 29.904-179.072 49.856l0 0zM828.896 633.648c-4.16 2.592-16.048 4.096-23.712 4.096-24.704 0-55.28-11.296-98.128-29.664 16.464-1.216 31.568-1.84 45.104-1.84 24.784 0 32.128-0.112 56.352 6.08s24.544 18.736 20.384 21.328l0 0z"/>
            <path d="M917.808 229.072c-22.208-30.288-53.168-65.696-87.184-99.696s-69.408-64.96-99.696-87.184c-51.568-37.824-76.592-42.192-90.928-42.192l-496 0c-44.112 0-80 35.888-80 80l0 864c0 44.112 35.888 80 80 80l736 0c44.112 0 80-35.888 80-80l0-624c0-14.336-4.368-39.344-42.192-90.928l0 0zM785.376 174.624c30.704 30.704 54.8 58.4 72.576 81.376l-153.952 0 0-153.952c22.976 17.776 50.672 41.872 81.376 72.576l0 0zM896 944c0 8.672-7.328 16-16 16l-736 0c-8.672 0-16-7.328-16-16l0-864c0-8.672 7.328-16 16-16 0 0 495.952 0 496 0l0 224c0 17.68 14.32 32 32 32l224 0 0 624z"/>
          </svg>
          <div>PDF</div>
        </a>
        <a onClick={this.handleExportWord.bind(this)}>
          <svg viewBox="0 0 1024 1024">
            <path d="M639.776 475.888l44.208 0-51.008 226.176-66.32-318.016-106.544 0-77.12 318.016-57.824-318.016-111.392 0 113.088 511.872 108.832 0 76.288-302.704 68.256 302.704 100.336 0 129.632-511.872-170.448 0 0 91.824z"/>
            <path d="M917.808 229.072c-22.208-30.288-53.168-65.696-87.184-99.696s-69.408-64.96-99.696-87.184c-51.568-37.824-76.592-42.192-90.928-42.192l-496 0c-44.112 0-80 35.888-80 80l0 864c0 44.112 35.888 80 80 80l736 0c44.112 0 80-35.888 80-80l0-624c0-14.336-4.368-39.344-42.192-90.928l0 0zM785.376 174.624c30.704 30.704 54.8 58.4 72.576 81.376l-153.952 0 0-153.952c22.976 17.776 50.672 41.872 81.376 72.576l0 0zM896 944c0 8.672-7.328 16-16 16l-736 0c-8.672 0-16-7.328-16-16l0-864c0-8.672 7.328-16 16-16 0 0 495.952 0 496 0l0 224c0 17.68 14.32 32 32 32l224 0 0 624z"/>
          </svg>
          <div>WORD</div>
        </a>
        <a onClick={this.handleExportEpub.bind(this)}>
          <svg viewBox="0 0 1024 1024">
            <path d="M917.808 229.072c-22.208-30.288-53.168-65.696-87.184-99.696s-69.408-64.96-99.696-87.184c-51.568-37.824-76.592-42.192-90.928-42.192l-496 0c-44.112 0-80 35.888-80 80l0 864c0 44.112 35.888 80 80 80l736 0c44.112 0 80-35.888 80-80l0-624c0-14.336-4.368-39.344-42.192-90.928zM785.376 174.624c30.704 30.704 54.8 58.4 72.576 81.376l-153.952 0 0-153.952c22.992 17.776 50.672 41.872 81.376 72.576zM896 944c0 8.672-7.328 16-16 16l-736 0c-8.672 0-16-7.328-16-16l0-864c0-8.672 7.328-16 16-16 0 0 495.952 0 496 0l0 224c0 17.68 14.32 32 32 32l224 0 0 624z"/>
            <path d="M736 832l-448 0c-17.68 0-32-14.32-32-32s14.32-32 32-32l448 0c17.68 0 32 14.32 32 32s-14.32 32-32 32z"/>
            <path d="M736 704l-448 0c-17.68 0-32-14.32-32-32s14.32-32 32-32l448 0c17.68 0 32 14.32 32 32s-14.32 32-32 32z"/>
            <path d="M736 576l-448 0c-17.68 0-32-14.32-32-32s14.32-32 32-32l448 0c17.68 0 32 14.32 32 32s-14.32 32-32 32z"/>
          </svg>
          <div>EPUB</div>
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
        <Content close={this.handleClose} note={this.props.note} content={this.props.content}/>
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
