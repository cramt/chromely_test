const {
    resolve
} = require('path');
const {
    CheckerPlugin
} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    context: resolve(__dirname),
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }],
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader"
                }
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            template: 'template.html',
        }),
    ],
    /*
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    */
    performance: {
        hints: false,
    },
};