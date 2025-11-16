import { useState, useEffect, useRef } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return seconds;
}
import useTimer from "./hooks/useTimer";

function TimerScreen() {
  const seconds = useTimer();

  return <h1>Timer: {seconds}s</h1>;
}
