Package.describe({
	name: 'started:react-router',
	version: '0.0.1',
	summary: 'React Router',
	git: ''
});


Package.onUse(function(api) {
  api.use(['react', 'cosmos:browserify']);
  api.imply(['react']);

  api.addFiles([
    'react-router.browserify.options.json',
    'react-router.browserify.js'
  ], 'client');

  api.export('ReactRouter', 'client');
});


Npm.depends({
  'exposify': '0.5.0',
	'react-router': '2.0.0',
});
