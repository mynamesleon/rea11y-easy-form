module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:jsx-a11y/recommended', 'plugin:storybook/recommended'],
  plugins: ['jsx-a11y'],
  rules: {
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'testing-library/no-container': 'off',
    'testing-library/no-node-access': 'off',
    'testing-library/prefer-screen-queries': 'off'
  },
  overrides: [{
    files: ['*.stories.tsx'],
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  }]
};