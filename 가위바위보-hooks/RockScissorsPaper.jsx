const React = require("react");
const { useState, useRef, useEffect } = React;

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

const RockScissorsPaper = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoord.바위);
  const interval = useRef();

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
    interval.current = setInterval(changeHand, 100);
    console.log("다시실행");
    return () => {
      // componentWillUnmount 역할
      console.log("종료");

      clearInterval(interval.current);
    };
  }, [imgCoord]); // 이 배열에는 바뀔 값을 넣어주면 된다., 이값을 비워두면 DidMount, 쓰면 DidUpdate라고 보면된다.
  // 배열안의 값이 바뀌면 useEffect가 다시 실행된다.
  //매번 clearInterval을 하기 때문에 그냥 setTimeout을 하는 것과 동일하다.
  //함수 컴포넌트는 render 실행될 떄마다 모든게 다시 실행된다.

  // componentDidMount() {
  //   // 첫 렌더링된 후,, 여기에 비동기 요청을 많이 함.
  //   this.interval = setInterval(this.changeHand, 500);
  // }

  // componentWillUnmount() {
  //   // 컴포넌트 제거 직전,, 비동기 요청 정리를 많이 함.
  //   clearInterval(this.inverval);
  // }

  const changeHand = () => {
    if (imgCoord === rspCoord.가위) {
      setImgCoord(rspCoord.바위);
    } else if (imgCoord === rspCoord.바위) {
      setImgCoord(rspCoord.보);
    } else if (imgCoord === rspCoord.보) {
      setImgCoord(rspCoord.가위);
    }
  };

  const comChoice = (imgCoord) => {
    return Object.entries(rspCoord).find((v) => v[1] === imgCoord)[0];
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = rspScore[choice];
    const comScore = rspScore[comChoice(imgCoord)];
    const diff = myScore - comScore;

    if (diff === 0) {
      setResult("비김");
    } else if ([1, -2].includes(diff)) {
      setResult("짐 ㅠㅠ");
      setScore((prevScore) => prevScore - 1);
    } else if ([-1, 2].includes(diff)) {
      setResult("짐 ㅠㅠ");
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      interval.current = setInterval(changeHand, 500);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{ background: `url(./rock.jpg) ${imgCoord} -90px` }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissors" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점입니다~</div>
    </>
  );
};

module.exports = RockScissorsPaper;
