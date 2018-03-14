import webpack from 'webpack';
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

require('dotenv').config();

module.exports = {
  resolve: {
    modules: ['./node_modules'],
  },

  entry: {
    main: './wp-content/themes/classicvue/app/app.js',
    vendor: ['vue', 'vue-router'],
  },

  output: {
    path: path.resolve('wp-content/themes/classicvue/dist/js'),
    filename: '[name].min.js',
    chunkFilename: '[name].min.js',
    publicPath: './js/', // relative to dist
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000, // inline files below 25kb
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

      // Accessible as a global in VueJS
      WP_HOME: `'${process.env.WP_HOME}'`,
    }),

    // Generate new index.html file with script tags
    // Note: Need to run webpack twice, without this the second time
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'wp-content/themes/classicvue/index.html'),
      filename: path.resolve(
        __dirname,
        'wp-content/themes/classicvue/dist/index.html',
      ),
    }),

    // Extract common dependencies into an existing entry chunk or an entirely // new chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),

    // For prerendering routes
    new PrerenderSpaPlugin(
      // Absolute path to compiled SPA
      // @see https://github.com/chrisvfritz/prerender-spa-plugin/issues/108#issuecomment-332134979
      path.resolve(__dirname, 'wp-content/themes/classicvue/dist'),
      // List of routes to prerender
      ['/'],
      // Advanced options
      {
        captureAfterTime: 5000,
      },
    ),
  ],
};
