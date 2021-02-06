// const React = require("react");
// const Tr = require("./Tr");
import React from "react";
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {/* 3번 반복문을 이렇게 표현 */}
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowIndex={i} rowData={tableData[i]} dispatch={dispatch}>
            {""}
          </Tr>
        ))}
    </table>
  );
};

// module.exports = Table;
export default Table;
