const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
