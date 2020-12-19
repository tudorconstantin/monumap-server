// quasar.conf.js

module.exports = function (ctx) {
  console.log(ctx);
  return {
    framework: {
      plugins: [
        'Loading'
      ],
      config: {
        loading: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
      }
    }
  };
};
