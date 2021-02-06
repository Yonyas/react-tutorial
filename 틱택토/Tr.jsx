// const React = require("react");
// const Td = require("./Td");
import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            key={i}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
            dispatch={dispatch}
          >
            {""}
          </Td>
        ))}
    </tr>
  );
});

// module.exports = Tr;
export default Tr;
