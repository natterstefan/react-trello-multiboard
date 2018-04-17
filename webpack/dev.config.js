const webpack = require('webpack')
const merge = require('webpack-merge')

// DEV Plugins
const Jarvis = require('webpack-jarvis')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',

  devServer: {
    // overlay: true,
    open: true,
    host: 'localhost',
    disableHostCheck: true, // Consider Warnings: https://github.com/webpack/webpack-dev-server/issues/882
    historyApiFallback: true, // makes react-router-dom routes work
    inline: true,
    quiet: true,
    port: 2222
  },

  plugins: [
    new Jarvis({
      port: 3333
    }),
    new ErrorOverlayPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
