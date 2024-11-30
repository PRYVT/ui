export const toReadableDateTime = (date: Date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleString(undefined, options);
};
