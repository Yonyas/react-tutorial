const React = require("react");
const { Component } = React;

class ResponseCheck extends Component {
  state = {
    state: "waiting", //배경색
    message: "클릭해서 시작하세요",
    result: [],
  };

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색으로 바뀌면 클릭해주세요",
      });
      setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭!",
        });
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤시간
    } else if (state === "ready") {
    } else if (state === "now") {
      this.setState({
        state: "waiting",
        message: "클릭해서 시작하세요!",
        result: [],
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <div>
        평균시간:
        {result.reduce((a, c) => a + c) / result.length}3 ms
      </div>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {/* jsx에서 null, undefined, false 는 태그없음을 뜻함 */}
        {this.renderAverage()}
      </>
    );
  }
}

module.exports = ResponseCheck;
