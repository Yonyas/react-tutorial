const React = require("react");
const Try = require("./Try");

//이 함수는 this 안써서 밖에 뺄 수 있었다. 제로초는 this 안쓰면 밖에 뺸다. class 안에 넣어도 된다.
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    let choosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    array.push(choosen);
  }
  return array;
}

class GuessNumber extends React.Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    const { answer, value, tries } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState({
        result: "홈런!",
        tries: [...tries, { try: value, result: "홈런!" }],
      });
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
        result: "",
      });
      //틀렸으면
    } else {
      let strike = 0;
      let ball = 0;

      const answerArray = value.split("").map((v) => parseInt(v));
      //10번 이상 틀렸을 때
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`,
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
          result: "",
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState({
          tries: [
            ...tries,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ],
          value: "",
        });
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { result, tries, value } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="number"
            maxLength={4}
            onChange={this.onChangeInput}
            value={value}
          />
          <button type="submit">입력!</button>
        </form>
        <div>시도 횟수: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차시도: `} tryInfo={v} index={i} />;
          })}
        </ul>
      </>
    );
  }
}

module.exports = GuessNumber;
