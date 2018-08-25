'use strict';

const PUBLIC_PATH = require('path').join(__dirname, 'public');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: PUBLIC_PATH,
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'stylus-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
}
