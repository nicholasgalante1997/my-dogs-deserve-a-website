const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(process.cwd(), 'src', 'dev', 'index.tsx')
    },

    mode: 'development',

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
        publicPath: 'auto'
    },

    devServer: {
        port: 4040,
        historyApiFallback: true,
        hot: true,
        open: true
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './html/development.html' })
    ]
};