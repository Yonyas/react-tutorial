const React = require("react");
const { memo } = React;

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

const Try = memo(({ tryInfo }) => {
  console.log("렌더링되고있나");
  return (
    <li key={tryInfo.try + tryInfo.result}>
      <b>{tryInfo.try}</b> - {tryInfo.result}
    </li>
  );
});

module.exports = Try;
