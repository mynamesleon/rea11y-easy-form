import type { FieldSubscription } from 'final-form';
import type {
  RepeaterContextStrings,
  RepeaterContextPropsBase,
} from './RepeaterContext.types';
import type { RepeaterContentProps } from './RepeaterContent.types';

export interface RepeaterProps
  extends RepeaterContextStrings,
    RepeaterContextPropsBase,
    RepeaterContentProps {
  subscription?: FieldSubscription;
  name: string;
}
