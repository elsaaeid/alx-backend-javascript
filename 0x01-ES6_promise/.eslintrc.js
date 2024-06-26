module.exports = {
    extends: 'airbnb-base',
    plugins: [
      'import',
    ],
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  };
  