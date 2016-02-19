Package.describe({
	name: 'started:jwt',
	version: '0.0.1',
	summary: 'jwt',
	git: ''
});

Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'jwt.browserify.options.json',
    'jwt.browserify.js'
  ], 'server');

  api.export('Jwt', 'server');
});

Npm.depends({
  'exposify': '0.5.0',
	'jsonwebtoken': '5.7.0',
});
