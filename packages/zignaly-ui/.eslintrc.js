module.exports = {
  "extends": [
    "zignaly-react"
  ],
  rules: {
    // The following rules are disabled because there are too many errors
    // TODO: FIXME
    "@typescript-eslint/no-shadow": "off", // FIXME
    "@typescript-eslint/no-explicit-any": "off",  // FIXME
    "no-console": "off",  // FIXME
    "jest/valid-expect": "off",  // FIXME
    "@typescript-eslint/ban-ts-comment": "off",  // FIXME
    "@typescript-eslint/ban-types": "off",  // FIXME
  },
}
