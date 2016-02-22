Package.describe({
	name: 'started:moment',
	version: '0.0.1',
	summary: 'Moment',
	git: ''
});

Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'moment.browserify.options.json',
    'moment.browserify.js'
  ]);

  api.export('moment');
});

Npm.depends({
  'exposify': '0.5.0',
	'moment': '2.11.2',
});
