const React = require("react");

// class Try extends React.Component {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li key={tryInfo.try + tryInfo.result}>
//         <b>{tryInfo.try}</b> - {tryInfo.result}
//       </li>
//     );
//   }
// }

const Try = ({ tryInfo }) => {
  return (
    <li key={tryInfo.try + tryInfo.result}>
      <b>{tryInfo.try}</b> - {tryInfo.result}
    </li>
  );
};

module.exports = Try;
