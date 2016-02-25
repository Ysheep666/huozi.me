const {Wildpad} = wildpad

class $StartedPad extends Wildpad {
  constructor(ref, place, options) {
    super(ref, place, options)

    this.$cmWrapper = $(this.codeMirror_.display.wrapper)
    this.$cmCommentInner = $('<div class="comment-wrap-inner"></div>');
    this.$cmCommentWrap = $('<div class="comment-wrap"><div class="comment-wrap-arrow"></div></div>')
    this.$cmSizer = this.$cmWrapper.find('div.CodeMirror-sizer')
    this.$cmText = this.$cmWrapper.find('div.CodeMirror-code')

    this.$cmCommentInner.appendTo(this.$cmCommentWrap)
    this.$cmCommentWrap.insertAfter(this.$cmWrapper)

    this.closeComment_ = (e) => {
      if (!$(e.target).closest('div.editor').length) {
        this.closeComments()
      }
    }

    this.resizeComment_ = () => {
      const windowHeight = $(window).height()
      const maxCommentHeight = windowHeight - 250

      let commentHeight = this.$cmCommentInner.height()
      if (commentHeight > (windowHeight - 150)) {
        commentHeight = windowHeight - 150
      }

      let top = this.codeMirror_.heightAtLine(this.index_, 'local') + 172 - $(window).scrollTop() - commentHeight / 2
      if (top < 100) {
        top = 100
      } else if ((top + commentHeight + 40) > windowHeight) {
        top = windowHeight - commentHeight - 40
      }

      this.$cmCommentInner.css({position: 'fixed', top})
      this.$cmCommentInner.find('div.comment-list').css({maxHeight: windowHeight - 250})
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
    this.index_ = index
    this.highlightLine(index)

    const that = this
    ReactDOM.render(React.createElement(EditorComment, {
      id: commentId,
      close: this.closeComments.bind(this),
      callback: (id) => {
        if (!commentId) {
          this.addCommentAttributes(index, id)
        }
      },
      removeComment: () => {
        this.removeCommentAttributes(index)
      }
    }), this.$cmCommentInner[0], function() {
      that.comment_ = this
    })

    this.$cmCommentWrap.find('div.comment-wrap-arrow').css({
      top: this.codeMirror_.heightAtLine(index, 'local') + 30
    })

    this.$cmCommentInner.css({
      position: 'absolute',
      top: this.codeMirror_.heightAtLine(index, 'local')
    })

    setTimeout(() => {
      if (!this.isOpenComment) {
        $(window).bind('resize', this.closeComment_)
        $('body').addClass('is-open-comment').bind('mousedown', this.closeComment_)
        this.$cmCommentInner.bind('mresize', this.resizeComment_)
        this.isOpenComment = true
      }
    }, 0)

    setTimeout(() => {
      this.resizeComment_()
      this.$cmCommentWrap.addClass('open')
    }, 100)
  }
  closeComments() {
    this.unHighlightLine()

    this.$cmCommentWrap.removeClass('open')
    ReactDOM.unmountComponentAtNode(this.$cmCommentInner[0])
    this.isOpenComment = false
    $(window).unbind('resize', this.closeComment_)
    $('body').removeClass('is-open-comment').unbind('mousedown', this._closeComment)
    this.$cmCommentInner.unbind('mresize', this.resizeComment_)
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
