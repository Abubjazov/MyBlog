const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })

    ],
    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.m?(js|ts)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000
    }
}

