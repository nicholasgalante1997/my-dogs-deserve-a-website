const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(process.cwd(), 'src', 'index.tsx')
    },

    mode: 'production',

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    output: {
        publicPath: 'auto',
        clean: true,
        path: path.resolve(process.cwd(), 'build'),
        filename: 'bundle.js'
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './html/index.html' })
    ]
};