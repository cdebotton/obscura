const env = {
  PORT: 3000,
  WEBPACK_PORT: 3001,
  NODE_ENV: 'development',
};

module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'dist/http/index.js',
      watch: ['dist'],
      nodeArgs: ['--expose-http2'],
      env,
    },
    {
      name: 'webpack',
      script: 'scripts/webpack-dev-server.js',
      env,
    },
  ],
};
