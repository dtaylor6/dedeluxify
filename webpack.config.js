const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  return {
    entry: './src/index.js',
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: env.local == 'true'
        ? {
          '/api': {
            target: 'http://localhost:3003/',
            secure: false
          }
        }
        :{},
      historyApiFallback: {
        index: 'index.html'
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
          __PRODUCTION__: JSON.stringify(argv.mode === 'production'),
          __LOCAL__: JSON.stringify(env.local === 'true')
      }),
    ]
  }
};

module.exports = config;