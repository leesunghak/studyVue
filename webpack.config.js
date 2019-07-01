var path = require("path");
var webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

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
        loaders: [{ test:/\.jsx?$/, loaders: "babel" }],
        rules: [
            {
                test: /\.css/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                  loaders: {},
                  // other vue-loader options go here
                },
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