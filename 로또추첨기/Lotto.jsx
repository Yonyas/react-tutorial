const React = require("react");
const { Component } = React;
const Ball = require("./Ball");
// import React, { Component} from 'react';
// import Ball from './Ball'

getNumbers = () => {
  console.log("getNumbers");
  var candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  var lottoNum = [];
  var winNum = [];
  var bonusNum;
  for (i = 0; i < 45; i++) {
    var temp = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    lottoNum.push(temp);
  }
  winNum = lottoNum.slice(0, 6).sort((p, c) => p - c);
  bonusNum = lottoNum[lottoNum.length - 1];
  return [...winNum, bonusNum];
};

class Lotto extends Component {
  state = {
    winNum: getNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];
  runTimeouts = () => {
    const { winNum } = this.state;
    //let을 쓰면 클로저문제가 안생긴다.
    for (let i = 0; i < winNum.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNum[i]],
          };
        });
      }, (i + 1) * 500);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNum[winNum.length - 1],
        redo: true,
      });
    }, 3500);
  };

  componentDidMount = () => {
    this.runTimeouts();
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("didUpdate");
    //update에는 조건문이 중요하다, state가 바뀔 때마다 실행 (여기서는 볼 추가될때마다)
    //조건문에 꼭 prev 안써도 된다.
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  };

  componentWillUnmount = () => {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  };

  onClickRedo = () => {
    this.setState({
      winNum: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번더</button>}
      </>
    );
  }
}

module.exports = Lotto;
// export default Lotto;
