const path = require('path')
const EncodingPlugin = require('webpack-encoding-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const encodingPlugin = new EncodingPlugin({
  encoding: 'UTF-8'
})

const minimize = {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 5
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

module.exports = {
  entry: [
    './app/index.js'
  ],

  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'main.[hash].js'
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ['babel-loader'], include: path.join(__dirname, 'app') },
      { test: /\.(scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.js$/, use: ['i18next-resource-store-loader'], include: path.join(__dirname, './app/translations') },
      { test: /\.jpe?g$|\.ico$|\.md$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: 'file-loader?name=[path][name].[ext]' }
    ]
  },

  plugins: [
    encodingPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      inject: 'body',
      filename: 'index.html',
      title: 'Gaming Ever After'
    })
  ],

  optimization: process.env.NODE_ENV === 'production' ? minimize : {},

  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  }
}
