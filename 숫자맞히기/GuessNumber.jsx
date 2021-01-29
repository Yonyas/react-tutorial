const React = require("react");
const { useState } = React;
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

const GuessNumber = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    //맞췄으면
    if (value === answer.join("")) {
      // this.setState((prevState) => {
      //   return {
      //     result: "홈런!",
      //     tries: [...prevState.tries, { try: value, result: "홈런!" }],
      //   };
      // });
      setResult("홈런!");
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });

      alert("게임을 다시 시작합니다.");

      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      setResult("");

      //틀렸으면
    } else {
      let strike = 0;
      let ball = 0;

      const myAnswerArray = value.split("").map((v) => parseInt(v));
      //10번 이상 틀렸을 때
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`);
        alert("게임을 다시 시작합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        setResult("");
      } else {
        for (let i = 0; i < 4; i++) {
          if (myAnswerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(myAnswerArray[i])) {
            ball++;
          }
        }
        // this.setState((prevState) => {
        //   return {
        //     tries: [
        //       ...prevState.tries,
        //       {
        //         try: value,
        //         result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        //       },
        //     ],
        //     value: "",
        //   };
        // });

        setTries((prevTries) => {
          return [
            ...prevTries,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ];
        });
        setValue("");
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="number"
          maxLength={4}
          onChange={onChangeInput}
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
};

module.exports = GuessNumber;
