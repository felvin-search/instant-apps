import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";
import { rendererData } from "./types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

function Renderer({ data }: { data: rendererData }) {
  // Multiple timezones can have the same time. Group timezones by the actual time
  const mapTimeToTz = {};
  data.ianaTimezones.forEach((tz) => {
    const localeTime = dayjs().tz(tz).format("LT");
    try {
      mapTimeToTz[localeTime].push(tz);
    } catch (err) {
      mapTimeToTz[localeTime] = [tz];
    }
  });

  return (
    <div key={data.location}>
      {Object.entries(mapTimeToTz).map(([time, timezones]) => (
        <>
          <h1 key={time}>{time}</h1>
          <em>
            {timezones[0]} {dayjs().tz(timezones[0]).offsetName("short")}{" "}
            {dayjs().tz(timezones[0]).offsetName("long")}
          </em>
        </>
      ))}
    </div>
  );
}

/**
 * Works using an offline library. Should use a more reliable and vast API in future.
 *
 * Caveat 1: time in cities is not super pleasant, since multiple cities with same name exists
 * in different countries.
 */
export default Renderer;
