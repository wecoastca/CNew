module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:node/recommended"
    ],
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    rules: {
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "node/prefer-promises/dns": "error",
        "node/prefer-promises/fs": "error"
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
      ]
};
  