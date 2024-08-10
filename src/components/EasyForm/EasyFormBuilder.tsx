import React, { Suspense } from 'react';
import { isElement as isReactElement, isValidElementType } from 'react-is';
import { reactKeyFrom, isNullOrUndefined } from '../../utils';
import type { EasyFormBuilderProps } from './EasyForm.types';
import useEasyFormBuilderSideEffect from './useEasyFormBuilderSideEffect';
import Skeleton, { SKELETON_TYPE } from '../Skeleton';
import { useEasyFormContext } from './EasyFormContext';
import Notice, { NOTICE_TYPE } from '../Notice';
import CONTROL_TYPE from '../../controlTypes';
import EasyField from '../EasyField';

/**
 * @note `<EasyFormBuilder>` and `<EasyFormRow>`
 * are both in same file to prevent circular dependency issues
 */

const getFieldName = (name?: string, prefix?: string): string | undefined => {
  if (prefix && name) {
    return `${prefix}.${name}`;
  }
  return name || prefix || undefined;
};

const EasyFormRow = ({ field = {}, fieldNamePrefix = '' }: any) => {
  const { containers, components } = useEasyFormContext();

  // handle the structure entry being a react node, just in case
  if (isReactElement(field)) {
    return field;
  }

  const { type, name: fieldName, ...fieldProps } = field;
  const name = getFieldName(fieldName, fieldNamePrefix);

  // container handling...
  const Container = containers[type];
  if (Container) {
    const { children, ...otherFieldProps } = fieldProps;
    // containers should be regular imports, not dynamic,
    // because we do not want any delays when registering fields,
    // but we will wrap it in a Suspense anyway just in case
    return (
      <Suspense fallback={<Skeleton type={SKELETON_TYPE.INPUT} />}>
        <Container {...otherFieldProps} name={name}>
          {type === CONTROL_TYPE.CONDITIONAL ? (
            () => (
              <EasyFormBuilder fieldNamePrefix={name} structure={children} />
            )
          ) : type === CONTROL_TYPE.REPEATER ? (
            ({ name }) => (
              <EasyFormBuilder fieldNamePrefix={name} structure={children} />
            )
          ) : (
            <EasyFormBuilder fieldNamePrefix={name} structure={children} />
          )}
        </Container>
      </Suspense>
    );
  }

  // component handling from here...
  // for components that get a field registered,
  // prevent rendering if there is no name
  // so that the rest of the form does not break
  if (!name) {
    return (
      <Notice type={NOTICE_TYPE.ERROR}>
        Field must have a name: <br />
        <code>{JSON.stringify(field)}</code>
      </Notice>
    );
  }
  const Component = components[type];
  if (
    Component ||
    typeof fieldProps.render === 'function' ||
    !isNullOrUndefined(fieldProps.children) ||
    isValidElementType(fieldProps.component) ||
    typeof fieldProps.children === 'function'
  ) {
    return (
      <EasyField
        component={Component}
        {...fieldProps}
        name={name}
        type={type}
      />
    );
  }

  // in dev mode, we will highlight that the field data is invalid
  if (process.env.NODE_ENV === 'development') {
    return (
      <Notice type={NOTICE_TYPE.ERROR}>
        No matching component, container, or rendering behaviour found for
        field:
        <br />
        <code>{JSON.stringify(field)}</code>
      </Notice>
    );
  }

  return null;
};

const EasyFormBuilder = ({
  fieldNamePrefix,
  structure,
}: EasyFormBuilderProps) => {
  useEasyFormBuilderSideEffect();

  // defensive checks, just in case...
  if (typeof structure === 'string' || isReactElement(structure)) {
    return structure;
  }
  if (!Array.isArray(structure)) {
    return null;
  }

  return (
    <>
      {structure.map((field, index) => {
        const { key, name } = field;
        return (
          <EasyFormRow
            key={reactKeyFrom(key, `${fieldNamePrefix || ''}${name || index}`)}
            fieldNamePrefix={fieldNamePrefix}
            field={field}
          />
        );
      })}
    </>
  );
};

export default EasyFormBuilder;
