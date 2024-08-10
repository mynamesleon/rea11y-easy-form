import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useDeepCompareMemo } from '@react-hookz/web';
import useConstant from 'use-constant';
import {
  DEFAULT_COMPONENTS,
  DEFAULT_CONTAINERS,
  DEFAULT_FIELD_VALIDATION_FUNCTIONS,
} from './EasyFormDefaultProps';
import type {
  EasyFormContextProps,
  EasyFormContextValue,
} from './EasyForm.types';

const EasyFormContext = createContext<EasyFormContextValue>({
  defaultFieldValidationFunctions: DEFAULT_FIELD_VALIDATION_FUNCTIONS,
  containers: DEFAULT_CONTAINERS,
  components: DEFAULT_COMPONENTS,
  structure: undefined,
  disabled: false,
});

export const useEasyFormContext = () =>
  useContext<EasyFormContextValue>(EasyFormContext);

const EasyFormContextProvider = ({
  defaultFieldValidationFunctions: validationFuncs,
  defaultFieldErrorLogic,
  defaultFieldConfig,
  disabled = false,
  components,
  containers,
  structure,
  children,
}: EasyFormContextProps) => {
  const structureRef = useRef<any[] | undefined>();
  structureRef.current = structure;
  const firstMountOnlyObjects = useConstant(() => ({
    // allow default validation functions
    // and default components to be overridden
    defaultFieldValidationFunctions: {
      ...DEFAULT_FIELD_VALIDATION_FUNCTIONS,
      ...validationFuncs,
    },
    components: {
      ...DEFAULT_COMPONENTS,
      ...components,
    },
    // but keep default containers, because the way they interact
    // may need specific handling (e.g. repeater and conditional)
    containers: {
      ...containers,
      ...DEFAULT_CONTAINERS,
    },
  }));
  const deepComareObjects = useDeepCompareMemo(
    () => ({
      defaultFieldErrorLogic,
      defaultFieldConfig,
    }),
    [defaultFieldConfig, defaultFieldErrorLogic]
  );

  const disableForm = Boolean(disabled);
  const contextValue = useMemo(
    () => ({
      ...firstMountOnlyObjects,
      ...deepComareObjects,
      structure: structureRef.current,
      disabled: disableForm,
    }),
    [firstMountOnlyObjects, deepComareObjects, disableForm]
  );

  return (
    <EasyFormContext.Provider value={contextValue}>
      {children}
    </EasyFormContext.Provider>
  );
};

export default EasyFormContextProvider;
