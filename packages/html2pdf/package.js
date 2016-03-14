Package.describe({
	name: 'started:html2pdf',
	version: '0.0.1',
	summary: 'html2pdf',
	git: ''
});


Package.onUse(function(api) {
  api.use(['cosmos:browserify']);

  api.addFiles([
    'html2pdf.browserify.options.json',
    'html2pdf.browserify.js'
  ], 'client');

  api.export('html2Pdf', 'client');
});


Npm.depends({
  'exposify': '0.5.0',
  'html-pdf': '2.0.1',
});
