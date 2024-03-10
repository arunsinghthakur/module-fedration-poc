const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./packages/index.js",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    // runtimeChunk: 'single',
    splitChunks: false,
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3001/",
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
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        nav: "nav@http://localhost:3002/remoteEntry.js",
        product_catelog: "product_catelog@http://localhost:3003/remoteEntry.js",
        product_cart: "product_cart@http://localhost:3004/remoteEntry.js",
        
      },
      exposes: ["./packages/index.js"],
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
