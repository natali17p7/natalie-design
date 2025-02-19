module.exports = {
  root: true,
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-tsdoc",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  rules: {
    "tsdoc/syntax": "warn",
    "react/no-unescaped-entities": 0,
    "no-unexpected-multiline": "warn",
    "semi": ["warn", "never", { "beforeStatementContinuationChars": "always" }],
    "semi-style": ["warn", "first"],
    "@typescript-eslint/no-unused-vars": [
	  "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
	  }
    ],
    // "@typescript-eslint/no-misused-promises": [2, {
    //   "checksVoidReturn": {
    //     "attributes": false
    //   }
    // }],
  },
  ignorePatterns: [".next", "config/*", ".eslintrc.js", "vitest.config.js", "jest.config.js", "next.config.js"],
};
