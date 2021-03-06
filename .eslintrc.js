module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next',
    // 'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'no-trailing-spaces': ['error', {skipBlankLines: true}],
    'no-multiple-empty-lines': 'error',
    'object-curly-spacing': ['error', 'never'],
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/link-passhref': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './components'],
          ['@elements', './components/elements'],
          ['@modules', './components/modules'],
          ['@sections', './components/sections'],
          ['@templates', './components/templates'],
          ['@constant', './constant'],
          ['@context', './context'],
          ['@core', './core'],
          ['@data', './data'],
          ['@images', './public/images'],
          ['@overmind', './overmind'],
          ['@videos', './public/videos'],
          ['@game', './public/game'],
          ['@styles', './styles'],
          ['@utils', './utils'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
