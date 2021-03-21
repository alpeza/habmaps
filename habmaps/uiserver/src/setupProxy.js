const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/devices/*',
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    '/data/*',
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    '/authen/*',
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  //Ws
  app.use(
    '/socket',
    createProxyMiddleware({
      target: "ws://localhost:8081",
      ws: true,
      pathRewrite: {
        '^/socket': '',
      },
    })
  );
};
