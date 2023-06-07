const { merge } = require('webpack-merge');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'Resto Radar',
      short_name: 'Resto Radar',
      description: 'Aplikasi katalog restoran',
      start_url: './index.html',
      background_color: '#f3f4f6',
      theme_color: '#1E6F5C',
      display: 'standalone',
      orientation: 'any',
      publicPath: './',
      filename: 'app.webmanifest',
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/logo/logo.png'),
          size: 180,
          destination: 'assets/icons',
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/images/logo/logo.png'),
          sizes: [72, 96, 128, 192, 256, 384, 512],
          destination: 'assets/icons',
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: './sw.bundle.js',
    }),
  ],
});
