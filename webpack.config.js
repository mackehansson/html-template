const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
let htmlPageNames = [];
const pages = fs.readdirSync("./src/views/");

pages.forEach((page) => {
    if (page.endsWith(".html")) {
        htmlPageNames.push(page.split(".html")[0]);
    }
});

let multipleHtmlPlugins = htmlPageNames.map((name) => {
    return new HtmlWebpackPlugin({
        template: `./src/views/${name}.html`,
        filename: `${name}.html`,
    });
});

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
    ].concat(multipleHtmlPlugins),
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
