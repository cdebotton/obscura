const ENV = (process.env.BABEL_ENV || process.env.NODE_ENV || '').trim();

let env = {};
let plugins = [];

if (ENV === 'client') {
  env = {
    targets: {
      browsers: ['last 2 versions'],
    },
    loose: true,
    modules: false,
  };

  plugins = ['react-hot-loader/babel'];
} else {
  env = {
    targets: {
      node: 'current',
    },
    loose: true,
  };
}

module.exports = {
  presets: ['stage-0', 'react', 'typescript', ['env', env]],
  plugins,
};
