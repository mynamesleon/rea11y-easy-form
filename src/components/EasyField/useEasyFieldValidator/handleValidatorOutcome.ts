import { capitaliseFirstLetter } from '../../../utils';

const handleValidatorOutcome = (
  result?: any,
  key?: string,
  val?: any
): string | undefined => {
  if (result) {
    return typeof result === 'string'
      ? result
      : typeof val === 'string'
        ? val
        : capitaliseFirstLetter(key);
  }
};

export default handleValidatorOutcome;
