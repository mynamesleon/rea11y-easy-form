import React, { ReactNode } from 'react';
import type { RenderableProps } from 'react-final-form';

// functionality primarily copied from react-final-form
const renderComponent = <T>(props: RenderableProps<T> & T): ReactNode => {
  const { render, children, component, ...other } = props;
  if (component) {
    return React.createElement(
      component as any,
      Object.assign(other, {
        children,
        render,
      }) as any
    );
  }
  if (typeof render === 'function') {
    return render(
      typeof children === 'undefined'
        ? (other as any)
        : (Object.assign(other, { children }) as any) // inject children back in
    );
  }

  if (typeof children === 'function') {
    return children(other as any);
  }

  return children || null;
};

export default renderComponent;
