const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value[0] === word[word.length - 1]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("떙");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
