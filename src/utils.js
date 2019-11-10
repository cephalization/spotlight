export const saveGeneralAuth = generalAuth => {
  localStorage.setItem("generalAuth", JSON.stringify(generalAuth));
};

export const loadGeneralAuth = () =>
  JSON.parse(
    localStorage.getItem("generalAuth") != null
      ? localStorage.getItem("generalAuth")
      : "{}"
  );

export const sortDate = (a, b) => {
  // Sort by year
  if (
    Number.parseInt(a.release_date.slice(0, 4), 10) -
      Number.parseInt(b.release_date.slice(0, 4), 10) <
    0
  ) {
    return -1;
  } else if (
    Number.parseInt(a.release_date.slice(0, 4), 10) -
      Number.parseInt(b.release_date.slice(0, 4), 10) >
    0
  ) {
    return 1;
  }

  // Year is the same, sort by month
  if (
    Number.parseInt(a.release_date.slice(5, 7), 10) -
      Number.parseInt(b.release_date.slice(5, 7), 10) <
    0
  ) {
    return -1;
  } else if (
    Number.parseInt(a.release_date.slice(5, 7), 10) -
      Number.parseInt(b.release_date.slice(5, 7), 10) >
    0
  ) {
    return 1;
  }

  // Month is the same, sort by day
  if (
    Number.parseInt(a.release_date.slice(8, 10), 10) -
      Number.parseInt(b.release_date.slice(8, 10), 10) <
    0
  ) {
    return -1;
  } else if (
    Number.parseInt(a.release_date.slice(8, 10), 10) -
      Number.parseInt(b.release_date.slice(8, 10), 10) >
    0
  ) {
    return 1;
  }

  // They have the same date, do not sort
  return 0;
};

export const toTimestamp = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
