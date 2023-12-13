enum CONTROL_TYPE {
  // native editable input types
  URL = 'url',
  TEL = 'tel',
  TEXT = 'text',
  DATE = 'date',
  FILE = 'file',
  TIME = 'time',
  WEEK = 'week',
  EMAIL = 'email',
  COLOR = 'color',
  RADIO = 'radio', // do we want to support singular radio inputs?
  RANGE = 'range',
  MONTH = 'month',
  NUMBER = 'number',
  SEARCH = 'search',
  HIDDEN = 'hidden',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  DATETIME_LOCAL = 'datetime-local',

  // further common non <input /> defaults
  SELECT = 'select',
  TEXTAREA = 'textarea',
  RADIO_LIST = 'radiolist',
  RADIOS = 'radios', // alias for radiolist
  SWITCH_LIST = 'switchlist',
  SWITCHES = 'switches', // alias for switchlist
  CHECKBOX_LIST = 'checkboxlist',
  CHECKBOXES = 'checkboxes', // alias for checkboxlist

  // enhancements on common fields
  SWITCH = 'switch',

  // containers
  HTML = 'html',
  FIELDSET = 'fieldset',
  DISCLOSURE = 'disclosure',

  // generic wrapper, where the container has no semantic relevance;
  // only really useful for creating logical groups in the structure object
  CONTAINER = 'container',
}

export default CONTROL_TYPE;
