const path = require('path');
const Package = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const GoogleFontsPlugin = require('google-fonts-plugin');

module.exports = (env, argv) => {
    return {
        entry: {
            main: ['normalize.css',
                path.resolve(__dirname, Package.main)
            ]
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

                // Needed to load api theme
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                },

                // Load images & make them responsive
                {
                    test: /\.(jpe?g|png)$/i,
                    loader: 'responsive-loader'
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
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: "[name].[hash].js"
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new GoogleFontsPlugin({
                outputDir: path.resolve(__dirname, 'build/fonts'),
                fonts: [{
                    family: 'Cabin',
                    variants: ['400', '500', '700'],
                    subsets: ['latin']
                }]
            })
        ].concat(argv.mode === 'production' ? [new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new webpack.EnvironmentPlugin({
                STATIC_PATH: `https://tuffyestates.sparling.us:1163${process.env.BRANCH === 'dev' ? '7': '8'}/static`,
                API_PATH: `https://tuffyestates.sparling.us:1163${process.env.BRANCH === 'dev' ? '7': '8'}/api`
            })
        ] : [
            new webpack.EnvironmentPlugin({
                STATIC_PATH: `http://localhost:11638/static`,
                API_PATH: `http://localhost:11638/api`
            })
        ]),
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: true
        }
    }
};
