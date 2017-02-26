/**
 * Created by liujinhe on 17/1/20.
 */

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var configuration = require('../src/configuration');

const root_folder = path.resolve(__dirname, '..');


var devMiddlewareScript = `webpack/hot/dev-server`;
var hotMiddlewareScript = `webpack-hot-middleware/client?path=http://127.0.0.1:${configuration.hmr.port}/__webpack_hmr&timeout=20000&reload=true`;
//var hotReactScript=`react-hot-loader/patch`
//var publicPath = `http://${configuration.hmr.host}:${configuration.hmr.port}/assets/`

var publicPath = `http://127.0.0.1:${configuration.hmr.port}/`;

function getLoaders(style) {
    return [
        {
            loader: 'css-loader',
            options: {
                modules: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [
                        require('autoprefixer')
                    ];
                }
            }
        },
        {loader: `${style}-loader`}
    ]
}


module.exports = {


    context: root_folder,
    entry: [devMiddlewareScript, hotMiddlewareScript, './src/client/web/entry.js'],
    output: {
        path: path.resolve(root_folder, 'build/assets'),
        publicPath: publicPath,
        filename: 'bundle.js',
        chunkFilename: '[name].[hash].js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['react-hot-loader', 'babel-loader']
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg|less)$/i,
            use: ['url-loader?limit=10000']
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader', loader: [{
                    loader: 'css-loader', options: {
                        discardComments: {removeAll: true}
                    }
                }]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    loader: getLoaders('sass')
                })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract(
                {
                    fallbackLoader: 'style-loader',
                    loader: [
                        // activate source maps via loader query
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                        return [
                                            require('autoprefixer')
                                        ];
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }

                    ]
                })
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({filename: 'style.css', allChunks: true})
    ]

}






