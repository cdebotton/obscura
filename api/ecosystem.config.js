module.exports = {
  apps: [
    {
      name: 'web',
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
