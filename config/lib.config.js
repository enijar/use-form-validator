const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "..", "src", "lib");

module.exports = {
  stats: "minimal",
  entry: path.join(SRC_PATH, "use-form-validator.ts"),
  output: {
    library: "use-form-validator",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "..", "build"),
    filename: "use-form-validator.js",
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
