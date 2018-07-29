const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    devtool: 'source-map',

    devServer: {
        contentBase: './dist'
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
        ]
    },

    module: {
        rules: [
            
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },

            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /node_modules/
            },

            {
                test: /\.scss$/,
                use: [ 
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            }

        ]
    },

    mode: 'development',
    
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
};
