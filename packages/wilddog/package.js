Package.describe({
	name: 'started:wilddog',
	version: '0.0.1',
	summary: 'Wilddog',
	git: ''
});

Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'wilddog.browserify.options.json',
    'wilddog.browserify.js'
  ], 'client');

  api.export('Wilddog', 'client');
});

Npm.depends({
  'exposify': '0.5.0',
	'wilddog': '0.5.0',
});
