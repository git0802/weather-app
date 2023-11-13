const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: "./src",
    },

    optimization: {
        runtimeChunk: 'single',
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new HtmlWebpackPlugin({template: "./src/template.html"}),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], 
            },
        ]
    },
});