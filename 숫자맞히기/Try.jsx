const React = require("react");

class Try extends React.Component {
  render() {
    return (
      <li key={this.props.tryInfo.try + this.props.tryInfo.result}>
        <b>{this.props.tryInfo.try}</b> - {this.props.tryInfo.result}
      </li>
    );
  }
}

module.exports = Try;
