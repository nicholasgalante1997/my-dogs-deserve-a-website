const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(process.cwd(), 'src', 'index.ts')
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
        onListening: function (devServerConfig) {
            if (!devServerConfig) {
                throw new Error('webpack-dev-server is not defined');
            }
            const port = devServer.server.address().port;
            console.log('Listening on port:', port);
        },
        open: true
    }
};