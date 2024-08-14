import type { FormState, FormSubscription } from 'final-form';
import type { RenderableProps } from 'react-final-form';

export interface MutatedFormSpyProps extends RenderableProps<FormState<any>> {
  subscription?: FormSubscription;
}
