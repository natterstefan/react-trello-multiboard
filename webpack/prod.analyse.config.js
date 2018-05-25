const production = require('./prod.config.js')
const merge = require('webpack-merge')
const Jarvis = require('webpack-jarvis')

module.exports = merge(production, {
  plugins: [
    new Jarvis({
      port: 3333,
      watchOnly: false
    }),
  ]
})
