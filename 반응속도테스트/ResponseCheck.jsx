const React = require("react");
const { Component } = React;

class ResponseCheck extends Component {
  state = {
    state: "waiting", //배경색
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime; //렌더링 안되게 여기에 썼음
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색으로 바뀌면 클릭해주세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤시간
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "성급하게 클릭했다",
      });
    } else if (state === "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요!",
          result: [...prevState.result, this.endTime - this.startTime],
        };
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
