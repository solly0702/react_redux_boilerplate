var path = require('path');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV
var isProd = ENV === "build";
var isTest = ENV === "test";

module.exports = {
    devtool: isProd ? 'source-map' : 'eval-source-map',
    devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
      quite: true,
      stats: 'minimal',
      port: 8080
    },
    entry: isProd ? {} : {
        bundle: './src/index.js',
        vendor: ['react']
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        publicPath: '/js',
        filename: '[name].min.js'
    },
    resolve: {
      modulesDirectories: ["node_modules", "bower_components"],
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel'],
            },
            {
                test: /\.(scss|css)/,
                loader: 'style-loader!css-loader!sass-loader?includePaths[]=' +
                path.resolve(__dirname, "./node_modules/compass-mixins/lib") +
                "&includePaths[]=" + path.resolve(__dirname, "./mixins/app_mixins")
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: isProd ? [] : [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        mangle: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.optimize.DedupePlugin({
        'process.env': { ENV: JSON.stringify(ENV) }
        })
    ]
};
