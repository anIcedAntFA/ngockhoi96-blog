const {
  propertyOrdering,
  selectorOrdering,
} = require('stylelint-semantic-groups');

/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    '@stylistic/stylelint-plugin',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/order': selectorOrdering,
    'order/properties-order': propertyOrdering,
    'import-notation': 'string',
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'define-mixin'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['alpha', 'rem'],
      },
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/^grid.*/', '/place.*/'],
      },
    ],
  },
};
