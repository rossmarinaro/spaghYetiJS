
////http server
  const port = process.env.PORT || 8080;

/////////////////////////////////////////////// webpack
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry:  './project/game.js',   
  module: {
   // noParse: ["ws"],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      },
      {
        test: /\.(gif|png|ogg|jpe?g|svg|xml|mp3|woff)$/i, 
        use: 'file-loader' ,
        exclude: [
          path.resolve(__dirname, '../project/assets/', '../project/')
        ]
      },
      {
        test: /\.css$/i, 
        use: 
           ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: port,
    proxy: { 
      '../socket.io.min.js': { 
        target: port, 
        ws: true 
      } 
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: '../server/project/index.html'
    }),
  ]
};













