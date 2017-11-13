var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.merchant.conf')
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
      'zues_URL': JSON.stringify('https://v6gv32ekre.execute-api.ap-southeast-1.amazonaws.com/'), // zues有关接口

      'hulk_URL': JSON.stringify('https://50eavr29x9.execute-api.ap-southeast-1.amazonaws.com/'), // hulk有关接口

      'Javis_URL': JSON.stringify('https://kg9d5ac655.execute-api.ap-southeast-1.amazonaws.com/'), // javis有关接口

      'diana_URL': JSON.stringify('https://1fjvkx51de.execute-api.ap-southeast-1.amazonaws.com/'), // diana有关接口

      'thor_URL': JSON.stringify('https://b8asomqkih.execute-api.ap-southeast-1.amazonaws.com/'), // thor有关接口

      'hera_URL': JSON.stringify('https://xbbw2jfb58.execute-api.ap-southeast-1.amazonaws.com/'), // hera有关接口

      'hawkeye_URL': JSON.stringify('https://ajlhg1sv9j.execute-api.ap-southeast-1.amazonaws.com/'), // hawkeye有关接口

      'stat_URL': JSON.stringify('https://jrryxhd7e4.execute-api.ap-southeast-1.amazonaws.com/'), // stat有关接口

      'other_URL': JSON.stringify('https://z2mwxg1qb5.execute-api.ap-southeast-1.amazonaws.com/'), // other有关接口(主要针对老曾接口)

      'stateMachine_URL': JSON.stringify('https://844sz7nr7l.execute-api.ap-southeast-1.amazonaws.com/'), // StateMachine有关接口

      'playerExt_URL': JSON.stringify('https://6b797cehg3.execute-api.ap-southeast-1.amazonaws.com/') // playerExt有关接口
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index/merchant/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
