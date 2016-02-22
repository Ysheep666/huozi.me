const {Wildpad} = wildpad

class $StartedPad extends Wildpad {
  constructor(ref, place, options) {
    super(ref, place, options)

    this.$cmWrapper = $(this.codeMirror_.display.wrapper)
    this.$cmCommentWrap = $('<div class="comment-wrap"><div class="comment-wrap-arrow"></div><div class="comment-wrap-inner"></div></div>')
    this.$cmSizer = this.$cmWrapper.find('div.CodeMirror-sizer')
    this.$cmText = this.$cmWrapper.find('div.CodeMirror-code')

    this.$cmCommentWrap.insertAfter(this.$cmWrapper)

    this.closeComment_ = (e) => {
      if (!$(e.target).closest('div.editor').length) {
        this.closeComments()
      }
    }

    this.codeMirror_.on('mousedown', (instance, e) => {
      const dom = $(e.target)
      const eventOffsetX = e.pageX - dom.offset().left
      if (dom.is('pre') && eventOffsetX > this.$cmSizer.width() + 20) {
        const from = this.codeMirror_.getViewport().from
        const index = from + this.$cmText.find('pre:visible').index(dom)
        if (dom.hasClass('wildpad-has-comment')) {
          const classList = dom.attr('class').split(/\s+/)
          _.each(classList, (value) => {
            const t = value.match(/^(wildpad-line-comment-)(.*)/)
            if (t) {
              this.openComment(index, t[2])
            }
          })
        } else {
          this.openComment(index)
        }
      } else if (this.isOpenComment) {
        this.closeComments()
      }
    })
  }
  highlightLine(index) {
    this.unHighlightLine()
    this.codeMirror_.addLineClass(index, 'wrap', 'highlight-commented-line')
  }
  unHighlightLine() {
    const dom = this.$cmText.find('.highlight-commented-line')
    if (dom.length) {
      const from = this.codeMirror_.getViewport().from
      const index = from + this.$cmText.children(':visible').index(dom)
      this.codeMirror_.removeLineClass(index, 'wrap', 'highlight-commented-line')
    }
  }
  openComment(index, commentId = null) {
    this.highlightLine(index)

    const that = this
    ReactDOM.render(React.createElement(EditorComment, {
      id: commentId,
      close: this.closeComments.bind(this),
      callback: (id) => {
        if (!commentId) {
          this.addCommentAttributes(index, id)
        }
        this.closeComments()
      }
    }), this.$cmCommentWrap.find('div.comment-wrap-inner')[0], function() {
      that.comment_ = this
    })

    this.$cmCommentWrap.css({
      top: this.codeMirror_.heightAtLine(index, 'local')
    }).addClass('open')

    setTimeout(() => {
      if (!this.isOpenComment) {
        $('body').bind('mousedown', this.closeComment_)
        this.isOpenComment = true
      }
    }, 0)
  }
  closeComments() {
    this.unHighlightLine()

    this.$cmCommentWrap.removeClass('open')
    ReactDOM.unmountComponentAtNode(this.$cmCommentWrap.find('div.comment-wrap-inner')[0])
    this.isOpenComment = false
    $('body').unbind('mousedown', this._closeComment)
  }
  addCommentAttributes(index, commentId) {
    this.richTextCodeMirror_.updateLineAttributes(index, index, (attributes) => {
      attributes['has-comment'] = true
      attributes['line-comment'] = commentId
    })
  }
  removeCommentAttributes(index) {
    this.richTextCodeMirror_.updateLineAttributes(index, index, (attributes) => {
      delete attributes['has-comment']
      delete attributes['line-comment']
    })
  }
}

StartedPad = $StartedPad
