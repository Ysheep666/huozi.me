class $NotePreview extends React.Component{
  constructor(props) {
    super(props)
    this.state = {content: ''}
  }
  initialize(content) {
    const converter = new Showdown.converter({extensions: ['table']})
    const html = converter.makeHtml(content)
    this.setState({content: html})
  }
  componentDidMount() {
    this.initialize(this.props.content)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content != this.props.content) {
      this.initialize(nextProps.content)
    }
  }
  render() {
    return (
      <div className="note-preview" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
    )
  }
}

NotePreview = $NotePreview
