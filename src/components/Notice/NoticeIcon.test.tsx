import React from 'react';
import { render } from '@testing-library/react';
import NoticeIcon from './NoticeIcon';
import { NoticeIconProps, NOTICE_TYPE } from './Notice.types';
import { ExclamationIcon, TickIcon, InfoIcon } from '../../icons';

jest.mock('../../icons', () => ({
  ExclamationIcon: jest.fn(() => null),
  TickIcon: jest.fn(() => null),
  InfoIcon: jest.fn(() => null),
}));

describe('<NoticeIcon />', () => {
  let props: NoticeIconProps;

  beforeEach(() => {
    props = {};
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<NoticeIcon {...props} />);

  it('renders an info icon by default', () => {
    renderComponent();
    expect(InfoIcon).toHaveBeenCalled();
  });

  it(`renders an info icon for the ${NOTICE_TYPE.INFO} type`, () => {
    props.type = NOTICE_TYPE.INFO;
    renderComponent();
    expect(InfoIcon).toHaveBeenCalled();
  });

  it(`renders an exclamation for the ${NOTICE_TYPE.ERROR} type`, () => {
    props.type = NOTICE_TYPE.ERROR;
    renderComponent();
    expect(ExclamationIcon).toHaveBeenCalled();
  });

  it(`renders an exclamation for the ${NOTICE_TYPE.WARNING} type`, () => {
    props.type = NOTICE_TYPE.WARNING;
    renderComponent();
    expect(ExclamationIcon).toHaveBeenCalled();
  });

  it(`renders a tick exclamation for the ${NOTICE_TYPE.SUCCESS} type`, () => {
    props.type = NOTICE_TYPE.SUCCESS;
    renderComponent();
    expect(TickIcon).toHaveBeenCalled();
  });

  it('passes all other props onto the icon', () => {
    props.type = NOTICE_TYPE.SUCCESS;
    props['aria-hidden'] = true;
    props.className = 'className';
    props['data-test'] = 'data-test';
    renderComponent();
    const { type, ...expected } = props;
    expect(TickIcon).toHaveBeenCalledWith(
      expect.objectContaining(expected),
      expect.any(Object)
    );
  });
});
