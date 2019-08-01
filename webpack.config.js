const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Core Concepts: 1 Entry Point, 2 Output, 3 Plug-ins, 4 Loaders

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],    // Bundle ES6 Polyfill w/ custom code
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,    // Test for all JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};