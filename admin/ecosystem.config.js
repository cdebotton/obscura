module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'dist/http/index.js',
      watch: ['dist'],
      nodeArgs: ['--expose-http2'],
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
