const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const common = require("./webpack.common");

require("dotenv").config({ path: "./.env" });

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./src",
  },

  optimization: {
    runtimeChunk: "single",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./src/template.html" }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
