import { useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';

const useEasyFormBuilderSideEffect = () => {
  const { pauseValidation, resumeValidation, isValidationPaused } =
    useForm('EasyFormBuilder');

  // pause validation while the EasyFormRow registers fields on their first render;
  // using a ref to fire this on initial render, but without relying on useEffect,
  // to match the logic used in the ReactFinalForm component:
  // https://github.com/final-form/react-final-form/blob/main/src/ReactFinalForm.js#L69
  const tempRef = useRef<boolean>(false);
  if (!tempRef.current) {
    // passing in false, so that subscribers are still notified;
    // @note: having to typecast to `any`, because the FormApi types
    // in some final-form versions are wrong
    (pauseValidation as any)(false);
    tempRef.current = true;
  }

  // use useEffect to resume validation after child components mount
  // @note: any internal conditional rendering should run through
  // the EasyFormBuilder component to re-run this validation logic
  useEffect(() => {
    if (isValidationPaused()) {
      resumeValidation();
    }
  }, [resumeValidation, isValidationPaused]);
};

export default useEasyFormBuilderSideEffect;
