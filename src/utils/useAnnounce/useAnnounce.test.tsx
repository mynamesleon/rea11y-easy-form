import React, { ReactNode, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import useAnnounce from './useAnnounce';

const TestComponent = ({
  announcement,
  mode,
}: {
  announcement?: ReactNode;
  mode?: 'off' | 'assertive' | 'polite';
}) => {
  const { announcer, announce } = useAnnounce(mode);
  useEffect(() => announce(announcement), [announcement, announce]);
  return announcer;
};

describe('useAnnounce', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the announcement text in a VisuallyHidden element', () => {
    render(<TestComponent announcement="test" />);
    expect(screen.getByText('test')).toHaveAttribute(
      'data-testid',
      'VisuallyHidden'
    );
  });

  it('passes the mode argument to the aria-live attribute of the VisuallyHidden element, assertive by default', () => {
    // default assertive
    render(<TestComponent announcement="test1" />);
    expect(screen.getByText('test1')).toHaveAttribute('aria-live', 'assertive');

    // custom mode
    render(<TestComponent announcement="test2" mode="polite" />);
    expect(screen.getByText('test2')).toHaveAttribute('aria-live', 'polite');
  });

  it('contains multiple announcements so that previous ones do not get cancelled', () => {
    const { rerender } = render(<TestComponent announcement="test1" />);
    rerender(<TestComponent announcement="test2" />);
    rerender(<TestComponent announcement="test3" />);
    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
    expect(screen.getByText('test3')).toBeInTheDocument();
  });

  it('renders 5 elements, keeping one empty', () => {
    const { rerender } = render(<TestComponent announcement="test1" />);
    rerender(<TestComponent announcement="test2" />);
    rerender(<TestComponent announcement="test3" />);
    rerender(<TestComponent announcement="test4" />);
    // should remove first one now
    rerender(<TestComponent announcement="test5" />);

    expect(screen.queryByText('test1')).not.toBeInTheDocument();
  });

  it('clears the VisuallyHidden element that is after the current announcement text', () => {
    const { rerender } = render(<TestComponent announcement="test1" />);
    rerender(<TestComponent announcement="test2" />);
    rerender(<TestComponent announcement="test3" />);
    rerender(<TestComponent announcement="test4" />);
    rerender(<TestComponent announcement="test5" />);
    rerender(<TestComponent announcement="test6" />);
    rerender(<TestComponent announcement="test7" />);
    expect(screen.getByText('test7').nextElementSibling).toHaveTextContent('');
  });
});
