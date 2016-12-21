let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './scripts/index.js',
    session: './scripts/session.js',
    join_session: './scripts/join_session.js',
    session_new: './scripts/session_new.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap')
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9#-]+)?$/,
      loader: 'file-loader?name=[name]-[sha512:hash:base64:7].[ext]'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    })
  ]
};
