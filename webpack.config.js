'use strict';

const path = require("path");
const srcPath = path.join(__dirname, 'src');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const defaultSettings = {port: 8080};

const config = {
    entry: [
        "babel-polyfill",
        // "./src/app/index.js"
    ],
    // output: {
    //     path: path.resolve(__dirname, "build/assets"),
    //     filename: "bundle.js",
    //     publicPath: 'assets/',
    //     library: "ReactFilterTable",
    //     libraryTarget: 'var'
    // }, //...
    module: {
        loaders: [
        //   {
        //     include: [
        //         path.resolve(srcPath, "app")
        //     ],
        //     test: /\.jsx?$/,
        //     loader: 'babel-loader',
        // },
        // {
        //     include: [
        //         path.resolve(srcPath, "stylesheets")
        //     ],
        //     test: /\.scss$/,
        //     loader: ExtractTextPlugin.extract("style", "css!sass")
        // },
        // {
        //     include: [
        //         path.resolve(srcPath, "static")
        //     ],
        //     loader: 'file?name=[path][name].[ext]&context=./src'
        // }
      ]
    },
    plugins: [
        // new ExtractTextPlugin("styles.css")
    ]
};
module.exports = config;
