// const React = require("react");
// const Table = require("./Table");
// const { useState, useReducer, useCallback } = React;

import React from "react";
import { useReducer, useCallback } from "react";
import Table from "./Table";

{
  /* <tr>
  <td></td>
  <td></td>
  <td></td>
</tr>; */
}

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

// const [winner, setWinner] = useState("");
// const [turn, setTurn] = useState("O");
// const [tableDate, setTableDate] = useState([
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ]);

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const SET_TURN = "SET_TURN";
export const CHANGE_TURN = "CHANGE_TURN";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨
      return {
        ...state, // 기존 state가 얕은복사가 된다.
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // tableData를 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;

      return {
        ...state,
        tableData,
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
  }
};

const Tictacto = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickTable = useCallback(() => {
    // props로 넘기는 함수는 useCallback
    dispatch({ type: SET_WINNER, winner: "O" }); //  이 객체가 액션객체고 dispatch하면 액션을 실행하는것
  }, []);

  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={state.tableData}
        dispatch={dispatch}
      />
      {state.winner && <div>{state.winner}님의 승리!</div>}
    </>
  );
};

// exports.CLICK_CELL = CLICK_CELL;
// module.exports = Tictacto;
export default Tictacto;
