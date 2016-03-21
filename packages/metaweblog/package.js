Package.describe({
	name: 'started:metaweblog',
	version: '0.0.1',
	summary: 'metaweblog',
	git: ''
});

Package.onUse(function(api) {
  api.addFiles(['index.js'], 'server');
  api.export('MetaWeblog', 'server');
});

Npm.depends({
  'metaweblog': '0.2.0',
});
