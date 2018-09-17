module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["vue"],
  rules: {
    "no-console": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: false,
        jsxBracketSameLine: true,
        arrowParens: "avoid",
        // parser: 'babylon', // problem with .vue files
        proseWrap: "never"
      }
    ]
  }
}
