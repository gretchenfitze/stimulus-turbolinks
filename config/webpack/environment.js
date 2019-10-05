const { environment } = require('@rails/webpacker')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

environment.loaders.append('vue', {
  test: /\.vue$/,
  use: [ {
    loader: 'vue-loader',
  } ],
});

environment.plugins.append(
  'VueLoaderPlugin',
  new VueLoaderPlugin()
);

environment.config.resolve.alias = { 'vue$': 'vue/dist/vue.esm.js' };

module.exports = environment
