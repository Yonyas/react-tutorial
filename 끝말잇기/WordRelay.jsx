const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "그댄내삶의이유",
    value: "",
    result: "",
  };
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value[0] === this.state.word[this.state.word - 1]) {
      console.log("hi");
      this.setState({
        word: this.state.value,
        value: "",
        result: "딩동댕",
      });
      this.input.focus();
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
    }
  };

  input;
  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button type="submit">입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
