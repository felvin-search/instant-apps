import countryTimezone from "country-timezone";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

type rendererData = {
  location: string;
  ianaTimezones: Array<string>;
};

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
 * Tries to convert a location into an IANA timezone.
 * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * Example: get "delhi" return Asia/Kolkata
 * get "japan" return Asia/Tokyo
 *
 * returns null if conversion is not possible
 */
function getIanaTimezonesFromLocation(location: string): Array<string> {
  // First try using an exact country code match
  // e.g. time in us
  let timezones = countryTimezone.getTimezonesWithCountryCode(
    location.toUpperCase()
  );
  if (timezones?.length > 0) return timezones;

  // If country code doesn't match, try using country name or city name
  timezones = countryTimezone.getTimezones(location);
  if (timezones?.length > 0) return timezones;

  return null;
}

const queryToData = async ({
  query,
}: {
  query: string;
}): Promise<rendererData> => {
  /**
   * Check if the query has time in it. Expecting the following queries:
   * time in Delhi
   * time India
   * New York time
   * UTC time
   * time at Tokyo
   */
  let processedQuery = query.toLowerCase();

  if (!processedQuery.includes("time")) return;
  // omit "time" from query
  processedQuery = processedQuery.replace("time", "");
  // omit prepositions
  // can't replace "in" without spaces since in could be part
  // of a location
  processedQuery = processedQuery.replace(" in ", "");
  processedQuery = processedQuery.replace(" at ", "");
  // especial case when user searched "time in", "in time", "time at", etc.
  if ([" in", "in ", " at", "at "].includes(processedQuery)) {
    processedQuery = "";
  }
  const location = processedQuery.trim();

  if (location === "") {
    const tz = dayjs.tz.guess();

    return {
      location,
      ianaTimezones: [tz],
    };
  }

  // Convert location into a timezone or multiple timezones (in case of cities)
  const ianaTimezones = getIanaTimezonesFromLocation(location);

  if (!ianaTimezones) {
    // Unable to parse location
    return;
  }

  return { location, ianaTimezones };
};

/**
 * Works using an offline library. Should use a more reliable and vast API in future.
 *
 * Caveat 1: time in cities is not super pleasant, since multiple cities with same name exists
 * in different countries.
 */
const MyApp = {
  name: "time",
  description: "I know time at places",
  queryToData,
  Component: Renderer,
};

export default MyApp;
