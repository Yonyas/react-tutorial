const React = require("react");
const { Component } = React;

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
        <button onClick={redo ? this.onClickRedo : () => {}}>한번더</button>
      </>
    );
  }
}

module.exports = Lotto;
