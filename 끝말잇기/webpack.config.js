const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
//node에서 경로 쉽게 조작하도록 path가 있음. 그런게 있음..

module.exports = {
  name: "wordrelay-setting",
  mode: "development", // production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //알아서 확장자 찾음.
  entry: {
    app: ["./client.jsx", "./WordRelay.jsx"],
  }, //입력, 배열 형식으로 넣으면 된다.
  // client.jsx안에서 이미 WordRelay 를 불러오기 때문에 client.jsx 만 불러오면 된다.
  // 사실 확장자도 안넣어줘도 됨. resolve 사용하면된다.

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/", // 가상의 경로 express.static 과 비슷.. node..
  },
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
