const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const NodeEnv = process.env.NODE_ENV || 'development'
const isDevMode = NodeEnv === 'development'
const CdnUrl = process.env.CDN_URL || '/'
const AssetVersion = process.env.ASSET_VERSION || new Date().getTime()

module.exports = {
  mode: NodeEnv,
  target: 'web',
  entry: {
    vendor: [
      'history',
      'immutable',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react',
      'redux-saga',
      'redux',
    ],
    main: './src/index.tsx'
  },
  output: {
    publicPath: '/',
    filename: isDevMode ? '[name]-[hash:7].js' : '[name]-[contenthash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: path.resolve(__dirname, './src'),
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.css$/,
        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    // for moment locale, please refer to https://github.com/moment/moment/tree/develop/locale
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|zh-cn|zh-tw/),
    new webpack.DefinePlugin({
      CDN_URL: JSON.stringify(CdnUrl),
      ASSET_VERSION: JSON.stringify(AssetVersion),
      DEV_MODE: isDevMode
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name]-[contenthash:7].css'
      // chunkFilename: isDevMode ? '[id].css' : '[name]-[contenthash:7].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      templateParameters: {
        cdn_url: CdnUrl,
        asset_version: AssetVersion
      },
      template: path.resolve(__dirname, './src/template.html'),
      filename: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
    })
  ],
  devtool: isDevMode ? 'cheap-module-source-map' : 'none',
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true // set to true if you want JS source maps
    //   }),
    //   new OptimizeCSSAssetsPlugin({})
    // ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /vendor/,
          chunks: 'all',
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 9003,
    compress: true,
    stats: {
      all: false,
      warnings: true,
      errors: true
    },
    historyApiFallback: true
  }
}