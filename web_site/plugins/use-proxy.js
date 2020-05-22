module.exports = (config) => {
  config.devServer = {
    proxy: {
      "/api/*": {
        // target: "http://market.1card1.cn",
        // target: "http://10.109.54.75",
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  };
};
