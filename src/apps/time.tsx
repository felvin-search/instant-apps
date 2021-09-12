import countryTimezone from "country-timezone";
import { InstantAppProps } from "./types";

function Renderer(props: InstantAppProps) {
  return <div>{JSON.stringify(props.data)}</div>;
}

/**
 * Tries to convert a location into an IANA timezone.
 * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * Example: get "delhi" return Asia/Kolkata
 * get "japan" return Asia/Tokyo
 *
 * returns null if conversion is not possible
 */
function getIanaTimezonesFromLocation(location: string) {
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

const queryToData = async ({ query }: { query: string }) => {
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
  const location = processedQuery.trim();

  // Convert location into a timezone
  const ianaTimezone = getIanaTimezonesFromLocation(location);

  return { location, time: ianaTimezone };
};

/**
 * Works using an offline library. Should use a more reliable and vast API in future.
 */
const MyApp = {
  name: "time",
  description: "I know time at places.",
  queryToData,
  Component: Renderer,
};

export default MyApp;
