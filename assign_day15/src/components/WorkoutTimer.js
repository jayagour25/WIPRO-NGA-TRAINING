import { useState, useEffect, useRef } from "react";

export default function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h2>Workout Timer</h2>
      <p>{seconds} seconds</p>
    </div>
  );
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {items.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}
