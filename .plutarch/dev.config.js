module.exports = {
  module: {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": 'css'
          }
        ]
      ]
    }
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://test',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};