var path = require('path')

var metalsmith  = require('metalsmith');
var layouts     = require('metalsmith-layouts');    // apply layouts to your source files
var permalinks  = require('metalsmith-permalinks'); // apply a permalink pattern to files
var markdown    = require('metalsmith-markdown');   // convert markdown files to html
var metallic 		= require('metalsmith-metallic');   // highlight code in markdown files
var inplace     = require('metalsmith-in-place');   // render templating syntax in your source files

var nunjucks    = require('nunjucks');              // custom templating engine

var appViews = [path.join(__dirname, 'layouts'), path.join(__dirname, 'src/components'), path.join(__dirname, 'src/partials'), path.join(__dirname, '/node_modules/@govuk-frontend/')];
nunjucks.configure(appViews, {watch: false, noCache: true, trimBlocks: true, lstripBlocks: true});

// nunjucks = require('jstransformer')(require('jstransformer-nunjucks'))
// nunjucks.configure(appViews, {watch: false, noCache: true});

metalsmith(__dirname)
  .metadata({
    title: "GOV.UK Design System"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(inplace({
    pattern: '**/*.njk',
      engineOptions: {
        path: appViews
      }    
    }
  ))
  .use(metallic())
  .use(markdown({
		smartypants: true,
		gfm: true,
		tables: true
	}))
  .use(permalinks())
  .use(layouts({
    engine: 'nunjucks',
    directory: 'layouts',
    default: 'layout.html'
  }))
  // Debug
  // .use(function(files, metalsmith, done) {
  //   console.log(files);
  //   console.log(metalsmith);
  //   done();
  // })
  .build(function(err, files) {
    if (err) { throw err; }
  });
