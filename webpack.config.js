const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new ReferenceError('process.env.NODE_ENV is undefined');
}

const getDevTool = env => {
  switch (env) {
    case 'development':
      return 'cheap-eval-source-map';
    default:
      return false;
  }
};

const config = {
  devtool: getDevTool(NODE_ENV),
  entry: path.join(process.cwd(), 'src/client/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'es2015',
                target: 'es2015',
                moduleResolution: 'node',
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name]-bundle.[hash].js',
    path: path.join(process.cwd(), 'public/dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
      },
    }),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      writeToFileEmit: true,
      fileName: path.join(process.cwd(), 'manifest.json'),
    }),
  ],
};

// if (NODE_ENV === 'production') {
//   config.plugins.push(new webpack.optimize.UglifyJsPlugin({

//   }));
// }

module.exports = config;
