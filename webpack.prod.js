const path = require('path');

const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = merge (common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        new HtmlWebpackPlugin ({
            template: "./src/template.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhiteSpace: true,
                removeComments: true
            }
        }),
        
        new CopyWebpackPlugin({
            patterns: [
                {   from: 'src/assets',
                    to: 'assets' }
            ],
        }),
    ],

    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, // Extract CSS into files
                "css-loader"], // Turns CSS to common JS
        }]
    },

});