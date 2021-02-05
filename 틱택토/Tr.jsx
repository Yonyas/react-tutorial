// const React = require("react");
// const Td = require("./Td");
import React from "react";
import Td from "./Td";

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((t, i) => (
          <Td rowIndex={rowIndex} cellIndex={i} dispatch={dispatch}>
            {""}
          </Td>
        ))}
    </tr>
  );
};

// module.exports = Tr;
export default Tr;
