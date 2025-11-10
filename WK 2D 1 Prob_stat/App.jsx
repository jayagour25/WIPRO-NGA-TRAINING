import React, { useState } from "react";

// --- Interface (using JSDoc for type hinting)
/**
 * @typedef {Object} NumberItem
 * @property {number} value
 */

// --- NumberList Component
const NumberList = ({ numbers }) => {
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

// --- FilterControls Component
const FilterControls = ({ onFilter, onMap, onReset }) => {
  return (
    <div>
      <button onClick={onFilter}>Filter Even Numbers</button>
      <button onClick={onMap}>Double Numbers</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

// --- Logger Component
const Logger = ({ numbers }) => {
  const logNumbers = () => {
    console.log("Logging numbers using forEach:");
    numbers.forEach((num) => console.log(num.value));
  };

  return <button onClick={logNumbers}>Log Numbers</button>;
};

// --- HoistingDemo Component
const HoistingDemo = () => {
  console.log("=== Hoisting Demo ===");

  // Variable hoisting example
  console.log(a); // undefined (due to hoisting)
  var a = 10;

  // Function hoisting example
  greet(); // works because of hoisting

  function greet() {
    console.log("Hello from a hoisted function!");
  }

  return (
    <div>
      <h3>Hoisting Demo</h3>
      <p>Check the console to see hoisting behavior.</p>
    </div>
  );
};

// --- ConstructorDemo Component
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hi, I'm ${this.name}, and I'm ${this.age} years old.`;
  }
}

const ConstructorDemo = () => {
  const john = new Person("John", 30);
  const jane = new Person("Jane", 25);

  return (
    <div>
      <h3>Constructor Demo</h3>
      <p>{john.greet()}</p>
      <p>{jane.greet()}</p>
    </div>
  );
};

// --- Parent App Component
const App = () => {
  const initialNumbers = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];
  const [numbers, setNumbers] = useState(initialNumbers);

  const handleFilter = () =>
    setNumbers(numbers.filter((num) => num.value % 2 === 0));

  const handleMap = () =>
    setNumbers(numbers.map((num) => ({ value: num.value * 2 })));

  const handleReset = () => setNumbers(initialNumbers);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>JSX and JavaScript Concepts Sprint</h2>
      <NumberList numbers={numbers} />
      <FilterControls
        onFilter={handleFilter}
        onMap={handleMap}
        onReset={handleReset}
      />
      <Logger numbers={numbers} />
      <HoistingDemo />
      <ConstructorDemo />
    </div>
  );
};

export default App;
