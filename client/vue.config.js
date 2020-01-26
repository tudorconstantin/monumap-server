const backendApi = process.env.API_URL
  ? `http://${process.env.API_URL}`
  : "http://localhost:8081";

module.exports = {
  "transpileDependencies": [
    "vuetify"
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