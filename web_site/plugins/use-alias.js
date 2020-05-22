const {root} = require('./utils');

module.exports = config => {
  config.resolve.alias
	  // .set('vue$', root('vue/dist/vue.esm.js'))
	  .set('components', root('src/components'))
	  .set('scripts', root('src/scripts'))
	  .set('pages', root('src/pages'))
	  .set('styles', root('src/styles'))
	  .set('store', root('src/store'))
	  .set('@', root('src'));
};
