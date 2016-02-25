Package.describe({
	name: 'started:pubsub',
	version: '0.0.1',
	summary: 'pubsub',
	git: ''
});

Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'pubsub.browserify.options.json',
    'pubsub.browserify.js'
  ], 'client');

  api.export('PubSub', 'client');
});

Npm.depends({
  'exposify': '0.5.0',
	'pubsub-js': '1.5.3',
});
