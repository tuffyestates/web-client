const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const Package = require('./package.json');

module.exports = (env, argv) => {
    return {
        entry: {
            main: ['normalize.css',
                path.resolve(__dirname, Package.main)
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            }
        },
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

                // Load images & make them responsive
                {
                    test: /\.(jpe?g|png)$/i,
                    loader: 'responsive-loader',
                    options: {
                        name: '[hash]-[width].[ext]',
                        outputPath: 'images'
                    }
                },

                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },

                // Load SVG placeholder image
                {
                    test: /\.(svg|gif)$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                },

                // Load worker files
                {
                    rules: [{
                        test: /\.worker\.js$/,
                        use: {
                            loader: 'worker-loader'
                        }
                    }]
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: "[name].[hash].js",

            // https://github.com/webpack/webpack/issues/6525
            globalObject: 'this'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Tuffy Estates"
            }),
        ].concat(argv.mode === 'production' ? [new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new webpack.EnvironmentPlugin({
                STATIC_PATH: `https://tuffyestates.sparling.us:1163${process.env.BRANCH === 'dev' ? '7': '8'}/static`,
                API_PATH: `https://tuffyestates.sparling.us:1163${process.env.BRANCH === 'dev' ? '7': '8'}/api/v1`
            }),
            new DynamicCdnWebpackPlugin(),
            new CompressionPlugin({
                compressionOptions: {
                    numiterations: 15
                },
                algorithm: zopfli.gzip
            }),
            new PreloadWebpackPlugin({
                rel: 'prefetch',
                include: 'allAssets',
                // Only prefetch images (prefetching scripts is handled by webapck's import())
                fileWhitelist: [/\.(jpe?g|png|svg|gif)$/]
            })
        ] : [
            new webpack.EnvironmentPlugin({
                STATIC_PATH: `https://estates.localhost:11638/static`,
                API_PATH: `https://estates.localhost:11638/api/v1`
            })
        ]),
        devtool: argv.mode === 'production' ? false : 'cheap-module-eval-source-map',
        devServer: {
            host: "estates.localhost",
            https: argv.mode === "development" ? {
                key: fs.readFileSync(
                    "./test/ssl/estates.localhost-key.pem"
                ),
                cert: fs.readFileSync("./test/ssl/estates.localhost-cert.pem")
            } : undefined,
            historyApiFallback: true
        }
    }
};
