import {
  destroyAutoComplete,
  enableAutoComplete,
  disableAutoComplete,
  setAutoCompleteOption,
  setAutoCompleteOptions,
} from './autoCompleteUtils';

const mockRef = {
  current: {
    destroy: jest.fn(),
    disable: jest.fn(),
    enable: jest.fn(),
    setOption: jest.fn(),
  },
};

describe('autoCompleteUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('destroyAutoComplete', () => {
    it('calls ref.current.destroy', () => {
      destroyAutoComplete(mockRef);
      expect(mockRef.current.destroy).toHaveBeenCalled();
    });

    it('does not error when called with an empty ref', () => {
      destroyAutoComplete({ current: null });
    });
  });

  describe('enableAutoComplete', () => {
    it('calls ref.current.enable', () => {
      enableAutoComplete(mockRef);
      expect(mockRef.current.enable).toHaveBeenCalled();
    });

    it('does not error when called with an empty ref', () => {
      enableAutoComplete({ current: null });
    });
  });

  describe('disableAutoComplete', () => {
    it('calls ref.current.disable', () => {
      disableAutoComplete(mockRef);
      expect(mockRef.current.disable).toHaveBeenCalled();

      mockRef.current.disable.mockClear();
      disableAutoComplete(mockRef, true);
      expect(mockRef.current.disable).toHaveBeenCalledWith(true);
    });

    it('does not error when called with an empty ref', () => {
      disableAutoComplete({ current: null });
    });
  });

  describe('setAutoCompleteOption', () => {
    it('calls ref.current.setOption', () => {
      setAutoCompleteOption(mockRef, 'deleteAllText', 'value');
      expect(mockRef.current.setOption).toHaveBeenCalledWith(
        'deleteAllText',
        'value'
      );
    });

    it('does not error when called with an empty ref', () => {
      setAutoCompleteOption({ current: null });
    });
  });

  describe('setAutoCompleteOptions', () => {
    it('calls ref.current.setOption for each option', () => {
      setAutoCompleteOptions(mockRef, {
        deleteAllText: 'value',
        srSelectedText: 'value',
        alsoSearchIn: ['blue'],
      });
      expect(mockRef.current.setOption).toHaveBeenCalledTimes(3);
      expect(mockRef.current.setOption).toHaveBeenCalledWith(
        'deleteAllText',
        'value'
      );
      expect(mockRef.current.setOption).toHaveBeenCalledWith(
        'srSelectedText',
        'value'
      );
      expect(mockRef.current.setOption).toHaveBeenCalledWith(
        'alsoSearchIn',
        expect.arrayContaining(['blue'])
      );
    });

    it('does not error when called with an empty ref', () => {
      setAutoCompleteOptions({ current: null }, {});
    });
  });
});
