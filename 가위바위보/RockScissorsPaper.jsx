const React = require("react");
const { Component } = React;

const rspCoord = {
  가위: "-40px",
  바위: "-185px",
  보: "-330px",
};

const rspScore = {
  가위: 1,
  바위: 0,
  보: -1,
};

class RockScissorsPaper extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: "-40px",
  };

  interval;

  componentDidMount() {
    // 첫 렌더링된 후,, 여기에 비동기 요청을 많이 함.
    this.interval = setInterval(this.changeHand, 2000);
  }
  componentDidUpdate() {
    // 리렌더링 후
  }
  componentWillUnmount() {
    // 컴포넌트 제거 직전,, 비동기 요청 정리를 많이 함.
    clearInterval(this.inverval);
  }

  changeHand = () => {
    if (this.state.imgCoord === rspCoord.가위) {
      this.setState({
        imgCoord: rspCoord.바위,
      });
    } else if (this.state.imgCoord === rspCoord.바위) {
      this.setState({
        imgCoord: rspCoord.보,
      });
    } else if (this.state.imgCoord === rspCoord.보) {
      this.setState({
        imgCoord: rspCoord.가위,
      });
    }
  };

  comChoice = (imgCoord) => {
    return Object.entries(rspCoord).find((v) => v[1] === imgCoord)[0];
  };

  onClickBtn = (choice) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    console.log(imgCoord, choice);
    console.log(Object.entries(rspCoord));
    const myScore = rspScore[choice];
    const comScore = rspScore[this.comChoice(imgCoord)];
    const diff = myScore - comScore;

    if (diff === 0) {
      this.setState({
        result: "비김",
      });
    } else if ([1, -2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "짐 ㅠㅠ",
          score: prevState.score - 1,
        };
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이김",
          score: prevState.score + 1,
        };
      });
    }
    this.interval = setInterval(this.changeHand, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{ background: `url(./rock.jpg) ${imgCoord} -90px` }}
        ></div>
        <div>
          <button
            id="rock"
            className="btn"
            onClick={() => this.onClickBtn("바위")}
          >
            바위
          </button>
          <button
            id="scissors"
            className="btn"
            onClick={() => this.onClickBtn("가위")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={() => this.onClickBtn("보")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점입니다~</div>
      </>
    );
  }
}

module.exports = RockScissorsPaper;
