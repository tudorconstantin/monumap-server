const backendApi = process.env.API_URL
  ? `http://${process.env.API_URL}`
  : "http://localhost:8081";

console.log(`backendApi`, backendApi);
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: backendApi,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
