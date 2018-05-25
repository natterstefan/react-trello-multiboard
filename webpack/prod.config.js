const common = require('./base.config.js')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    // http://nttr.st/2G0zh4c
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    // https://survivejs.com/webpack/building/bundle-splitting/
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'initial' // default splitting, or 'all'
    },
    // inspired by and some issues to read more about treeshaking in webpack
    // - https://github.com/gpspake/es6-todomvc/blob/c6e30fc6676ec362f3f4be8ec41df27c12007b8b/webpack.config.babel.js
    // - https://stackoverflow.com/a/47675519/1238150 (treeshaking w/ change in .babelrc)
    //   - see also: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/247#issuecomment-370911955
    // - https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/267 (Webpack 4 Issue)
    // - https://github.com/webpack/webpack/issues/6992 (Webpack 4 Issue)
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
          },
          output: {
            beautify: false,
            comments: false,
          }
        }
      })
    ]
  }

})
