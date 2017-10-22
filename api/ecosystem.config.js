module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/http/index.js',
      watch: ['dist'],
      nodeArgs: ['--expose-http2', '-r', 'reflect-metadata'],
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
