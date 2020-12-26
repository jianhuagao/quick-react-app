const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "@c": resolve("src/components"),
      "@p": resolve("src/pages")
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}