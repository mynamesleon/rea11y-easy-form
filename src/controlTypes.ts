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
  RADIO_LIST = 'radio_list',
  RADIOLIST = 'radiolist', // alias for radio_list
  RADIOS = 'radios', // alias for radiolist
  SWITCH_LIST = 'switch_list',
  SWITCHLIST = 'switchlist', // alias for switch_list
  SWITCHES = 'switches', // alias for switchlist
  CHECKBOX_LIST = 'checkbox_list',
  CHECKBOXLIST = 'checkboxlist', // alias for checkbox_list
  CHECKBOXES = 'checkboxes', // alias for checkboxlist

  // enhancements on common fields
  SWITCH = 'switch',
  AUTO_COMPLETE = 'auto_complete',
  AUTOCOMPLETE = 'autocomplete', // alias for auto_complete
  COMBO_BOX = 'combo_box', // alias for autocomplete
  COMBOBOX = 'combobox', // alias for autocomplete
  TYPE_AHEAD = 'type_ahead', // alias for autocomplete
  TYPEAHEAD = 'typeahead', // alias for autocomplete

  // containers
  HTML = 'html',
  FIELDSET = 'fieldset',
  DISCLOSURE = 'disclosure',

  // generic wrapper, where the container has no semantic relevance;
  // only really useful for creating logical groups in the structure object
  CONTAINER = 'container',
}

export default CONTROL_TYPE;
