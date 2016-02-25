class $NoteCatalogue extends React.Component{
  constructor(props) {
    super(props)
    this.state = {left: 5, items: []}
  }
  initialize(content) {
    const converter = new Showdown.converter()
    const html = converter.makeHtml(content)
    const hs = html.match(/\<h[1-5].*\>(.*)\<\/h[1-5]\>/gi)
    if (hs) {
      let left = 5
      let items = []
      for (let i = 0; i < hs.length; i++) {
        const h = hs[i]
        const item = JSON.parse(h.replace(/\<h([1-5]).*\>(.*)\<\/h[1-5]\>/gi, ($1, $2, $3) => {
          return JSON.stringify({
            level: parseInt($2),
            text: $3,
          })
        }))

        const alikes = _.filter(items, (v) => {
          return v.text == item.text
        })

        item.index = alikes.length

        items.push(item)
        if (item.level < left) { left = item.level }
      }

      this.setState({left, items})
    }
  }
  componentDidMount() {
    this.initialize(this.props.content)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content != this.props.content) {
      this.initialize(nextProps.content)
    }
  }
  handleScrollToTitle(data) {
    return (e) => {
      e.preventDefault()
      PubSub.publish('scroll to title', data)
    }
  }
  render() {
    const {left, items} = this.state
    return (
      <div className="note-catalogue">
        {items.length ? (
          <div className="note-catalogue-box">
            <div className="note-catalogue-bar"></div>
            <ul>
              {items.map((item, i) => {
                return (
                  <li key={i} className={`level${item.level - left}`}>
                    <a onClick={this.handleScrollToTitle({text: item.text, index: item.index})}>{item.text}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className="not-found">添加标题后会在这里自动生成目录</div>
        )}
      </div>
    )
  }
}

NoteCatalogue = $NoteCatalogue
