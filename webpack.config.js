var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var ENV = process.env.NODE_ENV
var isProd = ENV === "production";
var isTest = ENV === "test";

module.exports = {
    devtool: isProd ? 'source-map' : 'eval-source-map',
    devServer: {
      contentBase: "./src",
      historyApiFallback: true,
      quite: true,
      stats: 'minimal'
    },
    entry: isProd ? {} : {
        bundle: './src/index.js',
        vendor: ['react']
    },
    output: {
        path: './dist',
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js'
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
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?includePaths[]=' +
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
            },
            {   test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: isProd ? [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin()
    ] : [
        new webpack.DefinePlugin({
          'process.env': { ENV: JSON.stringify(ENV) }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: { keep_fnames: true }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency'
        }),
    ]
};
