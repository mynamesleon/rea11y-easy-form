import { renderComponent, useMutatedFormState } from '../../utils';
import { MutatedFormSpyProps } from './MutatedFormSpy.types';

const MutatedFormSpy = ({ subscription, ...other }: MutatedFormSpyProps) => {
  const formState = useMutatedFormState({ subscription });
  return renderComponent({
    ...other,
    ...formState,
  });
};

export default MutatedFormSpy;
