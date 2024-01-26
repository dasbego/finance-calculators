export const getFrequencyMultiplier = (frequency: string) => {
  if (frequency === "daily") {
    return 365;
  } else if (frequency === "weekly") {
    return 52;
  } else if (frequency === "monthly") {
    return 12;
  } else if (frequency === "yearly") {
    return 1;
  }
  return 1;
};

export default {
  getFrequencyMultiplier,
};
