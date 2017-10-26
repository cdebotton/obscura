const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { WEBPACK_PORT } = process.env;
if (!WEBPACK_PORT) {
  throw new ReferenceError('process.env.WEBPACK_PORT is undefined');
}

const config = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, '..', 'src', 'client', 'index.tsx'),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};

const compiler = webpack(config);
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    publicPath: config.output.publicPath,
    stats: {
      chunks: false,
      colors: true,
    },
  }),
);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(WEBPACK_PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at ${address}${port}`);
});
