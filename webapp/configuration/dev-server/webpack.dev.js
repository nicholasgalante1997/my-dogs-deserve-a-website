const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config();

console.log({ env: process.env });

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
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
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
      new HtmlWebpackPlugin({ template: './html/development.html' }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        stage: 'local',
        AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
        AWS_SECRET_ACCESS_KEY: JSON.stringify(process.env.AWS_SECRET_ACCESS_KEY),
        AWS_S3_BUCKET_NAME: JSON.stringify(process.env.AWS_S3_BUCKET_NAME)
      })
    ]
};