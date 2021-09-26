import { isTriggered } from "@felvin-search/core";
import countryTimezone from "country-timezone";
import { rendererData } from "./types";

/**
 * Tries to convert a location into an IANA timezone.
 * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * Example: get "delhi" return Asia/Kolkata
 * get "japan" return Asia/Tokyo
 *
 * returns null if conversion is not possible
 */
function getIanaTimezonesFromLocation(location: string): Array<string> | void {
  // First try using an exact country code match
  // e.g. time in us
  let timezones = countryTimezone.getTimezonesWithCountryCode(
    location.toUpperCase()
  );
  if (timezones?.length > 0) return timezones;

  // If country code doesn't match, try using country name or city name
  timezones = countryTimezone.getTimezones(location);
  if (timezones?.length > 0) return timezones;

  return;
}

export default async function ({
  query,
}: {
  query: string;
}): Promise<rendererData | undefined> {
  /**
   * Check if the query has time in it. Expecting the following queries:
   * time in Delhi
   * time India
   * New York time
   * UTC time
   * time at Tokyo
   */
  if (!isTriggered(query, ["time"], { substringMatch: true })) return;

  // omit "time" from query
  let processedQuery = query.toLowerCase().replace("time", "");
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
}
