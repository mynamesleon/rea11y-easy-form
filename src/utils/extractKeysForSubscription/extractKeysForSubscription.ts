const extractKeysForSubscription = (
  potential = {},
  evaluator = (key: string, value?: any): any => Boolean(value)
) => {
  const accumulator = {};
  for (const entry in potential) {
    if (potential.hasOwnProperty(entry) && evaluator(entry, potential[entry])) {
      accumulator[entry] = true;
    }
  }
  return accumulator;
};

export default extractKeysForSubscription;
