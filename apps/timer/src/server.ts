import { isTriggered, queryToDataInput } from "@felvin-search/core";

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

export default async function ({ query }: queryToDataInput) {
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
}
