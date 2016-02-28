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
    } else {
      this.setState({left: 5, items: []})
    }
  }
  componentDidMount() {
    this.initialize(this.props.content)

    this.catalogueIndex = -1
    this.scrollPage = () => {
      const $window = $(window)
      const headers = $('.editor .CodeMirror .cm-header')
      if (headers.length) {
        let index = -1, _index = -1
        for (let i = 0; i < headers.length; i++) {
          const $header = $(headers[i])
          const $el = $header.is('pre') ? $header : $header.closest('pre')
          if (!($header.text().indexOf('#') < 0)) {
            _index++
            if ($window.scrollTop() > $el.position().top + 19) {
              index = _index
            }
          }
        }

        if (this.catalogueIndex !== index) {
          this.catalogueIndex = index
          const $list = $(this.refs.catalogueList)
          $list.find('li.active').removeClass('active')
          if (!(this.catalogueIndex < 0)) {
            const $li = $list.find('li').eq(this.catalogueIndex)
            const _height = (_index + 1) * $li.height()
            const height = $list.height()
            const top = this.catalogueIndex * $li.height()

            $li.addClass('active')

            if (_height > height && top > (height/2)) {
              $list.scrollTop(top - height/2)
            }
          }
        }
      }
    }

    $(window).bind('scroll', this.scrollPage)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content != this.props.content) {
      this.initialize(nextProps.content)
    }
  }
  componentWillUnmount() {
    $(window).unbind('scroll', this.scrollPage)
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
            <ul ref="catalogueList">
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
