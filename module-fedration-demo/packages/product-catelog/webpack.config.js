const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./index.js",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    // runtimeChunk: 'single',
    splitChunks: false,
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3003/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
            configFile: "./tsconfig.json",
            extensions: ['.js', '.ts', '.tsx'],
        })],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'fruit', to: 'fruit' },
        // other patterns...
      ],
      options: {
        concurrency: 100,
        // other options...
      },
    }),
    new ModuleFederationPlugin({
      name: "product_catelog",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductCatelog": "./src/ProductCatelog"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
