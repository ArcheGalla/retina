const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            query: {name: '[name]_[hash].[ext]'}
          }
        ]
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};

