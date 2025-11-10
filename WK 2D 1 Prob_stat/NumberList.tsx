import React from "react";
import { NumberItem } from "./types";

interface NumberListProps {
  numbers: NumberItem[];
}

const NumberList: React.FC<NumberListProps> = ({ numbers }) => {
  return (
    <div>
      <h3>Number List</h3>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;