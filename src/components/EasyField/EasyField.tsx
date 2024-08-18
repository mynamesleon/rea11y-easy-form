import React, { Suspense, forwardRef } from 'react';
import EasyFieldGroup from './EasyFieldGroup';
import Skeleton, { SKELETON_TYPE } from '../Skeleton';
import { useEasyFormContext } from '../EasyForm/EasyFormContext';
import useEasyFieldValidator from './useEasyFieldValidator';
import {
  FIELD_TYPE_OVERRIDE_KEY as OVERRIDE_KEY,
  FIELD_DATA_LABEL_KEY,
  useSetFieldData,
  renderComponent,
} from '../../utils';
import type { EasyFieldProps } from './EasyField.types';

const EasyField = forwardRef<HTMLDivElement, EasyFieldProps>(
  (localProps, ref) => {
    const { disabled: contextDisabled, defaultFieldConfig = {} } =
      useEasyFormContext();
    const {
      meta: passMeta,
      validation,
      validate,
      required,
      label,
      type,
      name,
      component,
      children,
      render,
      ...props
    }: EasyFieldProps = { ...defaultFieldConfig, ...localProps };

    const { isRequired, handleValidate } = useEasyFieldValidator(
      required,
      validation,
      validate
    );

    // we store the label against the mutable field data,
    // so that it is available to the `<EasyForm>` validation summary
    useSetFieldData(name, { [FIELD_DATA_LABEL_KEY]: label }, [label]);

    // we allow overriding the `type` for the field
    // so that components can leverage internal final-form behaviour,
    // e.g. having a boolean 'switch' recognised as a 'checkbox'
    const fieldType = props[OVERRIDE_KEY] || component?.[OVERRIDE_KEY] || type;
    return (
      <EasyFieldGroup
        {...props}
        ref={ref}
        name={name}
        label={label}
        type={fieldType}
        required={isRequired}
        validate={handleValidate}
      >
        {({ input, meta, ...other }) => (
          <Suspense fallback={<Skeleton type={SKELETON_TYPE.INPUT} />}>
            {renderComponent({
              meta: passMeta ? meta : undefined,
              ...other,
              // merge the input props from `useField()` after `other`
              // as these are the most important
              ...input,
              disabled: contextDisabled || other.disabled,
              component,
              children,
              render,
              // ensure the `type` from the form structure is passed
              // to the component instead of any field type override
              type,
            })}
          </Suspense>
        )}
      </EasyFieldGroup>
    );
  }
);

export default EasyField;
