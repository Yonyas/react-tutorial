const path = require("path");
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
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  }, // 출력, path.join은 현재폴더경로(__dirname) 안의 dist 를 보고 알아서 합쳐줌
};
