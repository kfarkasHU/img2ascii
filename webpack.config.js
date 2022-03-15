const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: [
    "./src/main.ts",
    "./src/styles.scss"
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
              loader: 'file-loader',
              options: { outputPath: 'styles/', name: '[name].min.css'}
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
            loader: 'html-loader'
        }
    },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    compress: true,
    port: 9000
  }
};
