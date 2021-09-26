import { InstantAppProps } from "@felvin-search/core";
import React, { useEffect, useState } from "react";

const Timer = (props: InstantAppProps) => {
  // const [isValidQuery, setIsValidQuery] = useState(false);
  const [minutes, setMinutes] = useState(props.data.minutes || 0);
  const [seconds, setSeconds] = useState(props.data.seconds || 0);
  var audio = new Audio("./ring.wav");

  useEffect(() => {
    let myInterval = setInterval(() => {
      let newSeconds = seconds;
      let newMinutes = minutes;
      if (seconds > 0) {
        newSeconds = seconds - 1;
        setSeconds(newSeconds);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          audio.play();
        } else {
          newMinutes = minutes - 1;
          newSeconds = 59;
          setMinutes(newMinutes);
          setSeconds(newSeconds);
        }
      }

      document.title = countdownString(newMinutes, newSeconds);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <h1>{countdownString(minutes, seconds)}</h1>;
};

/* Consistent way to represent time left in UI and window title. */
const countdownString = (minutes: number, seconds: number): string => {
  if (minutes === 0 && seconds === 0) {
    return "Ding ding ding!";
  }
  return `${minutes} m  ${seconds} s`;
};

export default Timer;
