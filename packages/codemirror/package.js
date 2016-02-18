Package.describe({
	name: 'started:codemirror',
	version: '0.0.1',
	summary: 'Codemirror',
	git: ''
});


Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'codemirror.browserify.options.json',
    'codemirror.browserify.js'
  ], 'client');

  api.addFiles('.npm/package/node_modules/codemirror/lib/codemirror.css', 'client');

  api.export('CodeMirror');
});


Npm.depends({
  'exposify': '0.5.0',
	'codemirror': '5.11.0',
});
