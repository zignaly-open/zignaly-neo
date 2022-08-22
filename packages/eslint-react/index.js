module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react",
    "import",
    "react-hooks",
    "i18next",
    "@typescript-eslint",
    "unicorn",
    "jest",
    "no-autofix"
  ],
  "parser": "@typescript-eslint/parser",
  "root": true,
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "legacyDecorators": true,
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "17"
    }
  },
  "rules": {
    "no-console": "error",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-null": "off",
    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/no-abusive-eslint-disable": "error",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "no-underscore-dangle": "off",
    "no-return-assign": "off",
    "react/prop-types": "off",
    "react/jsx-handler-names": "off",
    "react/jsx-fragments": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "no-new": "off",
    "no-plusplus": "off",
    "jest/no-mocks-import": "off",
    "react/no-danger": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/no-array-index-key": "error",
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "memo"
        ]
      }
    ],
    "@typescript-eslint/no-unused-expressions": "off",
    "no-unused-expressions": "off",
    "object-curly-spacing": "off",
    "no-use-before-define": "off",
    "no-restricted-syntax": "off",
    "react/jsx-key": "error",
    "unicorn/explicit-length-check": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "i18next/no-literal-string": [
      "error",
      {
        "markupOnly": true
      }
    ],
    "unicorn/no-reduce": "off",
    // how pathetic one must be to enable this?
    "react/jsx-pascal-case": [
      "error",
      {
        "allowLeadingUnderscore": true
      }
    ],
    "unicorn/filename-case": [
      "error",
      {
        "cases": {
          "camelCase": true,
          "pascalCase": true
        },
        "ignore": [
          "react-app-env.d.ts",
          "module-name.d.ts"
        ]
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "enum",
        "format": [
          "UPPER_CASE",
          "PascalCase"
        ]
      }
    ]
  }
}
