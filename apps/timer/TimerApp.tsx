import React, { useEffect, useState } from "react";
import {
  InstantApp,
  InstantAppProps,
  queryToDataInput,
} from "../../sandbox/apps/types";
import { isTriggered } from "../lib/utilityApis";

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

const convertNaturalStringToDate = (query: string): number => {
  const processedQuery = query.toLowerCase().trim();

  const [number, duration] = processedQuery.split(" ");

  const parsedNumber = parseInt(number);
  if (isNaN(parsedNumber)) {
    throw new Error(`${number} is not a number.`);
  }

  const multiplier = {
    sec: 1,
    secs: 1,
    second: 1,
    seconds: 1,
    min: 60,
    mins: 60,
    minute: 60,
    minutes: 60,
    hour: 60 * 60,
    hours: 60 * 60,
  };

  const processedDuration = duration
    .toLowerCase()
    .trim() as keyof typeof multiplier;
  // Acceptable strings contain a number and a word
  if (!Object.keys(multiplier).includes(processedDuration)) {
    throw new Error(`Unknown duration ${duration}`);
  } else {
    return parsedNumber * multiplier[processedDuration];
  }
};

/* Consistent way to represent time left in UI and window title. */
const countdownString = (minutes: number, seconds: number): string => {
  if (minutes === 0 && seconds === 0) {
    return "Ding ding ding!";
  }
  return `${minutes} m  ${seconds} s`;
};

const parseTimerQuery = async ({ query }: queryToDataInput) => {
  // Trigger timer only if the query string
  // contains the word "timer"
  if (!isTriggered(query, ["timer"], { substringMatch: true })) return;
  try {
    // TODO(orkohunter) Very basic for now. Needs a better library to
    // handle all kinds of natural language duration conversion
    /**
     * Converts strings into Date. Working examples now
     * '10 seconds timer', '1 hour timer', '5 mins timer', etc.
     * @returns Number of seconds
     */
    // TODO(orkohunter): Support words like 'five minutes'
    const queryWithoutTrigger = query.replace("timer", "");
    const durationInSeconds = convertNaturalStringToDate(query);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return { minutes, seconds };
  } catch (err) {
    return;
  }
};

const TimerApp: InstantApp = {
  queryToData: parseTimerQuery,
  Component: Timer,
};

export default TimerApp;
