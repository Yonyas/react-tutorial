const React = require("react");
const ReactDom = require("react-dom");
const WordRelay = require("./WordRelay");

// class WordRelay extends React.Component {
//     state = {

//     }
//     render() {

//     }
// }
// 여기서 해도 되지만 다른 파일로 분리시켜준다.

ReactDom.render(<WordRelay />, document.querySelector("#root"));
