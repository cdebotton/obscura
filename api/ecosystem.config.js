module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/http/index.js',
      watch: ['dist', 'node_modules'],
      nodeArgs: ['--expose-http2'],
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
