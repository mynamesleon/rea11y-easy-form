const HEX_COLOR_REGEX =
  /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;

const isHexColor = (value?: any): boolean =>
  typeof value === 'string' && HEX_COLOR_REGEX.test(value);

export default isHexColor;
