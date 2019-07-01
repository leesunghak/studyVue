var path = require("path");
var webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { VueLoaderPlugin } = require("vue-loader");

module.exports ={
    entry: ["babel-polyfill",  "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "build.js",
        devtoolModuleFilenameTemplate:"[absolute-resource-path]",
        devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]",
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
              },
              {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
              },
              {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                  name: "[name].[ext]?[hash]",
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json"],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: { 
        hints: false,
    },
    devtool: "inline-cheap-module-source-map"
}

if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "#source-map";
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    ]);
  }
  