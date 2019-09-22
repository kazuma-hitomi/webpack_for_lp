const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'eval-source-map',
  externals: {
    jquery: 'jQuery',
  },
  entry: {
    main: './src/js/main.js',
    top: './src/js/top.js',
    about: './src/js/about.js',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer({
                  grid: true,
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'ie >= 11',
                    'Android >= 4',
                    'iOS >= 10',
                  ],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              path: outputPath,
              name: './images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['top'],
    }),
    new HtmlWebPackPlugin({
      template: './src/about.html',
      filename: './about/index.html',
      chunks: ['about'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
