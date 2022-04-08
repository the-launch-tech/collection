const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './libs/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, 'libs'),
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            import: false,
                            modules: true,
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include: path.join(__dirname, 'libs'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:base64:8].[ext]',
                        },
                    },
                    {
                        loader: 'img-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new HtmlWebpackPlugin({
            title: 'Internal Canvas',
            filename: 'canvas.html',
            scriptLoading: 'defer',
        }),
    ],
};
