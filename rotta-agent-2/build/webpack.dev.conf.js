var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      'zues_URL': JSON.stringify('https://n2agent.na12345.com'), // zues有关接口

      'hulk_URL': JSON.stringify('https://n2agent.na12345.com'), // hulk有关接口

      'Javis_URL': JSON.stringify('https://n2agent.na12345.com'), // javis有关接口

      'diana_URL': JSON.stringify('https://n2agent.na12345.com'), // diana有关接口

      'thor_URL': JSON.stringify('https://n2agent.na12345.com'), // thor有关接口

      'hera_URL': JSON.stringify('https://n2agent.na12345.com'), // hera有关接口

      'hawkeye_URL': JSON.stringify('https://n2agent.na12345.com'), // hawkeye有关接口

      'stat_URL': JSON.stringify('https://n2agent.na12345.com'), // stat有关接口

      'playerExt_URL': JSON.stringify('https://n2agent.na12345.com'), // playerExt有关接口

      'stateMachine_URL': JSON.stringify('https://n2agent.na12345.com'), // StateMachine有关接口
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
