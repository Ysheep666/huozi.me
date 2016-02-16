class $EditorAdapter {
  constructor(place) {
    this.cm = Codemirror(place, {
      mode: 'markdown',
      lineWrapping: true,
      extraKeys: {Enter: 'newlineAndIndentContinueMarkdownList'}
    })
  }
}

EditorAdapter = $EditorAdapter
