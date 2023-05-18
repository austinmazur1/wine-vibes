

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });
  
  hbs.registerHelper('pageWithNoNav', function(path, options) {
    return options.data.root.currentPage !== '/';
  })