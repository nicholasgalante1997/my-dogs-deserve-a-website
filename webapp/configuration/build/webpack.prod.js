const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config();

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
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
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
      new HtmlWebpackPlugin({ template: './html/index.html' }),
      new webpack.EnvironmentPlugin({
        stage: 'delta',
        AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
        AWS_SECRET_ACCESS_KEY: JSON.stringify(process.env.AWS_SECRET_ACCESS_KEY),
        AWS_S3_BUCKET_NAME: JSON.stringify(process.env.AWS_S3_BUCKET_NAME),
        AWS_CLOUDFRONT_DISTRIBUTION_URL: JSON.stringify(process.env.AWS_CLOUDFRONT_DISTRIBUTION_URL)
      })
    ]
};