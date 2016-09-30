var debug = process.env.NODE_ENV === "production"   //NODE_ENV=production webpack
var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  devtool: "eval",
  entry: {
    client: "./src/client.js",
    vendors: ["react"]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  resolve: {
    modulesDirectories: ["node_modules", "src", "bower_components"],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
  historyApiFallback: true,
  contentBase: "./",
  hot: true,
  inline: true,
  port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["add-module-exports", "react-html-attrs", "transform-class-properties", "transform-decorators-legacy", "transform-react-constant-elements", "transform-react-inline-elements"]
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: debug ? [] : [
    // new BundleTracker({filename: './webpack-stats.json'}),        // python django only!
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.bundle.js'),
    new webpack.optimize.DedupePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ]
};
