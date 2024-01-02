import {
  RepeaterContextStrings,
  RepeaterContextPropsBase,
} from './RepeaterContext.types';
import { RepeaterContentProps } from './RepeaterContent.types';

export interface RepeaterProps
  extends RepeaterContextStrings,
    RepeaterContextPropsBase,
    RepeaterContentProps {
  name: string;
}
