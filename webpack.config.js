const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: "/",
    },
    devServer: {
        contentBase: "./dist",
        watchContentBase: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new HtmlWebpackPlugin({
            template: "public/about.html",
            filename: "about.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
};
