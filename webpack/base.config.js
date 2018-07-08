const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const Config = require('../config/config')
const pkg = require('../package.json')
const SRC_DIR = path.resolve(process.cwd(), './src')

const extractSass = new ExtractTextPlugin({
  filename: 'src/[hash].[name].css'
})

module.exports = {
  entry: {
    'client.bundled.js': [
      'babel-polyfill',
      './src/index.js'
    ],
    'styles': path.resolve(__dirname, '..', 'src', 'styles', 'main.scss')
  },

  output: {
    filename: 'src/[hash].[name]',
    path: path.resolve(process.cwd(), './dist')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader"
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        }
    ]
  },

  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: './views/index.html',
      filename: 'index.html',
      inject: 'body',
      // additional data
      apiKey: Config.api_key,
      appTitle: Config.app_title,
      appVersion: pkg.version
    })
  ]
}
