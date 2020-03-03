module.exports = {
    extends: [
        "eslint:recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "eslint-plugin-node"
      ]
};
  