const path = require('path');
const Package = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    return {
        entry: ['normalize.css',
            // 'babel-polyfill',
            path.resolve(__dirname, Package.main)
        ],
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
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: "[hash].js"
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new webpack.EnvironmentPlugin({
                DOMAIN_BASE: "https://gitlab.com/tuffyestates/user-client/raw/new/test"
            })
        ].concat(argv.mode === 'production' ? [new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })] : []),
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true
        }
    }
};
