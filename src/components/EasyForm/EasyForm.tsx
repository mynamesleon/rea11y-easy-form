import React from 'react';
import EasyFormForm from './EasyFormForm';
import type { EasyFormProps } from './EasyForm.types';
import EasyFormContextProvider from './EasyFormContext';
import useEasyFormValidationSummaryDataMapper from './useEasyFormValidationSummaryDataMapper';

const EasyForm = ({
  defaultFieldValidationFunctions,
  defaultFieldErrorLogic,
  defaultFieldConfig,
  validationSummary,
  components,
  containers,
  structure,
  disabled,
  ...other
}: EasyFormProps) => {
  const mappedValidationSummaryData =
    useEasyFormValidationSummaryDataMapper(validationSummary);
  return (
    <EasyFormContextProvider
      defaultFieldValidationFunctions={defaultFieldValidationFunctions}
      defaultFieldErrorLogic={defaultFieldErrorLogic}
      defaultFieldConfig={defaultFieldConfig}
      components={components}
      containers={containers}
      structure={structure}
      disabled={disabled}
    >
      <EasyFormForm
        {...other}
        validationSummary={mappedValidationSummaryData}
      />
    </EasyFormContextProvider>
  );
};

EasyForm.displayName = EasyForm;
export default EasyForm;
