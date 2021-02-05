// const React = require("react");
// const CLICK_CELL = require("./Tictacto");
// const { useCallback } = React;
import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./Tictacto";

const Td = memo(({ rowIndex, cellIndex, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, []);

  return <td onClick={onClickTd}>{""}</td>;
});

// module.exports = Td;
export default Td;
