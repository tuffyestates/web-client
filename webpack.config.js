const path = require('path');
const Package = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['normalize.css', 'babel-polyfill', path.resolve(__dirname, Package.main)],
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

            // Needed to load normalize.css
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: "[hash].js"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
        devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true
    }
};
