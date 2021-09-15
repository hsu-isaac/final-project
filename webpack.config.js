require('dotenv/config');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server/public');
const serverPublicImagesPath = path.join(serverPublicPath, 'images');
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: serverPublicPath
  },
  plugins: [
    new webpack.EnvironmentPlugin(['REACT_APP_GOOGLE_MAPS_API_KEY'])
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    publicPath: '/',
    contentBase: serverPublicPath,
    watchContentBase: true,
    watchOptions: {
      ignored: serverPublicImagesPath
    },
    stats: 'minimal',
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    },
    historyApiFallback: true
  },
  performance: {
    hints: false
  }
};
