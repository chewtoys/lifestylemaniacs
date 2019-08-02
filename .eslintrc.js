module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  // add your custom rules here
  rules: {
    quotes: [2, 'single'],
    semi: [0],
    'require-await': [0],
    'no-console': [0],
    'no-new-func': [0]
  }
};
