var debug = process.env.NODE_ENV === "production";
var path = require('path');
var webpack = require('webpack');
// var BundleTracker = require('webpack-bundle-tracker'); // only for django
module.exports = {
    devServer: {
        historyApiFallback: true,
        contentBase: "./src",
        inline: true,
        hot: true,
        port: 8080
    },
    devtool: 'eval',
    entry: {
        bundle: './dev/index.js',
        vendor: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'src/js'),
        publicPath: 'http://localhost:8080/client/src/js/',
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
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
              test: /\.(png|jpg)$/,
              loader: "url-loader?limit=100000"
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
        new webpack.optimize.DedupePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        mangle: false,
        sourceMap: false
        }),
        // new BundleTracker({filename: '../webpack-stats.json'}),        // python django only!
    ]
};
