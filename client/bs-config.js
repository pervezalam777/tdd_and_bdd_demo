module.exports = {
  open: false,
  server: {
    middleware: {
      0: null // removes default `connect-logger` middleware
    }
  }
};