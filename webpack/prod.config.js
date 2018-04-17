const common = require('./base.config.js')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    // http://nttr.st/2G0zh4c
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    // https://survivejs.com/webpack/building/bundle-splitting/
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'initial' // default splitting, or 'all'
    }
  },

  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: false
    })
  ]
})
