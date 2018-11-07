const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack-common.config.js');
const resolve = require("path").resolve

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        './src/index.tsx' // the entry point of our app
    ],
    output: {
        path: resolve('./client/public/'),
        filename: 'bundle.js',
        publicPath: './'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new webpack.ProvidePlugin({
            "React": "react"
        })
    ],
});