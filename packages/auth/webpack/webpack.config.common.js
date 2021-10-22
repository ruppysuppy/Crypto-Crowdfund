const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
    ],
};
