const React = require("react");
const { useState } = React;
const { useRef } = React;

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색으로 바뀌면 클릭해주세요");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 1000); // 1초~2초 랜덤시간
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(timeout.current);

      setState("waiting");
      setMessage("성급하게 클릭했다");
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();

      setState("waiting");
      setMessage("클릭해서 시작하세요!");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onClickBtn = (e) => {
    e.preventDefault();
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균시간:
          {result.reduce((a, c) => a + c) / result.length} ms
        </div>
        <button onClick={onClickBtn}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {/* jsx에서 null, undefined, false 는 태그없음을 뜻함 */}
      <div> {renderAverage()}</div>
    </>
  );
};

module.exports = ResponseCheck;
