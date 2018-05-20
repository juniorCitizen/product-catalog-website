module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: false,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  parser: 'babylon',
  proseWrap: 'never',
  overrides: [
    {
      files: 'prettier.config.js',
      options: {parser: 'babylon'},
    },
  ],
}
