if (typeof wilddog === 'undefined' || wilddog === null) {
  wilddog = {};
}

/**
 * Object to represent Formatted text.
 *
 * @type {Function}
 */
wildpad.Text = (function() {
  function Text(text, formatting) {
    // Allow calling without new.
    if (!(this instanceof Text)) { return new Text(text, formatting); }

    this.text = text;
    this.formatting = formatting || wildpad.Formatting();
  }

  return Text;
})();
