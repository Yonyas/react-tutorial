const React = require("react");
const { useState } = React;
const { useRef } = React;
const { useEffect, useMemo, useCallback } = React;
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

const Lotto = () => {
  const lottoNumbers = useMemo(() => getNumbers(), []);
  const [winNum, setWinNum] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  const onClickRedo = () => {
    console.log("onClick함수");
    setWinNum(getNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  };

  useEffect(() => {
    console.log("mount & update");
    for (let i = 0; i < winNum.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNum[i]]);
      }, (i + 1) * 500);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNum[winNum.length - 1]);
      setRedo(true);
    }, 3500);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); //빈배열이면 DidMount와 동일

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
      {redo && <button onClick={onClickRedo}>한번더</button>}
    </>
  );
};

module.exports = Lotto;
// export default Lotto;
