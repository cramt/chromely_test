const merge = require('webpack-merge');
const {
    resolve
} = require('path');

const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, './build'),
        publicPath: './',
    },
    devtool: 'source-map',
    plugins: [],
});