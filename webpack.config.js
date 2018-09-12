const path = require('path');
const Package = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
                },

                {
                    test: /\.(jpg|png)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[hash].[ext]",
                        },
                    },
                },
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
        ].concat(argv.mode === 'production' ? [new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new CopyWebpackPlugin(['test'])
        ] : []),
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true
        }
    }
};
