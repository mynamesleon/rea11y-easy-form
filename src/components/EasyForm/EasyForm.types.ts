import type { ForwardedRef, MutableRefObject, ReactNode } from 'react';
import type {
  FormState,
  ValidationErrors,
  FieldSubscription,
  FieldValidator,
  FormApi,
  FormSubscription,
} from 'final-form';
import type {
  FormProps,
  RenderableProps,
  UseFieldConfig,
} from 'react-final-form';
import type { Dictionary } from '../../utils/constants';

export enum EasyFormValidationSummaryModeTypes {
  DYNAMIC = 'dynamic',
  STATIC = 'static',
  NONE = 'none',
}

export enum EasyFormValidationSummaryContentTypes {
  ERRORS = 'errors',
  LABELS = 'labels',
}

type EasyFormValidationSummaryRenderFunction = (
  ref: ForwardedRef<HTMLElement>
) => ReactNode;

export type EasyFormValidationSummaryInfo = {
  render?: EasyFormValidationSummaryRenderFunction | null;
  content?: EasyFormValidationSummaryContentTypes;
  mode?: EasyFormValidationSummaryModeTypes;
  renderLogic?: FormSubscription;
  position?: InsertPosition;
  header?: ReactNode;
  footer?: ReactNode;
};

export type EasyFormValidationSummaryProp =
  | Boolean
  | EasyFormValidationSummaryInfo
  | EasyFormValidationSummaryModeTypes
  | EasyFormValidationSummaryRenderFunction;

export interface EasyFormValidationSummaryProps extends FormState<any> {
  staticErrors?: ValidationErrors;
  validationSummary?: EasyFormValidationSummaryInfo;
}

export interface UseEasyFormDecoratorProps {
  validationSummary?: EasyFormValidationSummaryInfo;
  ref: MutableRefObject<HTMLDivElement | undefined>;
}

interface FormRenderPropsWithoutHandleSubmit extends FormState<any> {
  form: FormApi<any>;
}

interface EasyFormPropsBase {
  header?:
    | ((props: FormRenderPropsWithoutHandleSubmit) => ReactNode)
    | ReactNode;
  footer?:
    | ((props: FormRenderPropsWithoutHandleSubmit) => ReactNode)
    | ReactNode;
  submitText?: string;
  structure?: any[];
}

export interface EasyFormContentProps
  extends EasyFormPropsBase,
    RenderableProps<any>,
    FormRenderPropsWithoutHandleSubmit {
  validationSummary?: EasyFormValidationSummaryInfo;
  staticErrors?: ValidationErrors;
  hasOnSubmit?: boolean;
}

export interface EasyFormFormProps
  extends EasyFormPropsBase,
    Omit<FormProps, 'onSubmit'>,
    Dictionary {
  className?: string;
  disabled?: boolean;
  onSubmit?: FormProps['onSubmit'];
}

export interface EasyFormBuilderProps {
  fieldNamePrefix?: string;
  structure?: any[];
}

interface EasyFormContextFieldDefaults {
  defaultFieldConfig?: UseFieldConfig<any>;
  defaultFieldErrorLogic?: FieldSubscription;
}

interface EasyFormContextPropsBase {
  defaultFieldValidationFunctions?: Dictionary<FieldValidator<any>>;
  components?: Dictionary<any>;
  containers?: Dictionary<any>;
  disabled?: boolean;
}

export interface EasyFormContextValue
  extends Required<EasyFormContextPropsBase>,
    EasyFormContextFieldDefaults {}

export interface EasyFormContextProps
  extends EasyFormContextPropsBase,
    EasyFormContextFieldDefaults {
  children: ReactNode;
}

export interface EasyFormProps
  extends EasyFormContextPropsBase,
    EasyFormContextFieldDefaults,
    EasyFormFormProps {
  validationSummary?: EasyFormValidationSummaryProp;
  disabled?: boolean | undefined;
}
