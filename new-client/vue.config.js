const backendApi = process.env.API_URL
  ? `http://${process.env.API_URL}`
  : "http://localhost:8081";

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    proxy: {
      "^/api": {
        target: backendApi,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
