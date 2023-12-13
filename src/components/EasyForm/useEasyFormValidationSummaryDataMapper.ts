import { useDeepCompareMemo } from '@react-hookz/web';
import {
  type EasyFormValidationSummaryProp,
  EasyFormValidationSummaryModeTypes,
  EasyFormValidationSummaryInfo,
  EasyFormValidationSummaryContentTypes,
} from './EasyForm.types';
import { isNullOrUndefined } from '../../utils';

const DEFAULT_VALIDATION_SUMMARY_DATA: EasyFormValidationSummaryInfo = {
  content: EasyFormValidationSummaryContentTypes.ERRORS,
  mode: EasyFormValidationSummaryModeTypes.DYNAMIC,
  renderLogic: { submitFailed: true },
  position: 'afterbegin',
  render: null,
  header: null,
  footer: null,
};

const useEasyFormValidationSummaryDataMapper = (
  data?: EasyFormValidationSummaryProp
) =>
  useDeepCompareMemo(() => {
    const result = { ...DEFAULT_VALIDATION_SUMMARY_DATA };
    if (data === false) {
      result.mode = EasyFormValidationSummaryModeTypes.NONE;
    } else if (typeof data === 'string') {
      // treat string as setting the type
      result.mode = data;
    } else if (typeof data === 'function') {
      // if provided a function, just set the `render` property
      result.render = data;
    } else if (typeof data === 'object' && !isNullOrUndefined(data)) {
      // treat object as merge
      return { ...result, ...data };
    }
    // interpret anything else as default dynamic validation summary type
    return result;
  }, [data]);

export default useEasyFormValidationSummaryDataMapper;
