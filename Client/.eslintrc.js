// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	'linebreak-style': 'off',
	'comma-dangle': 'off',
	'semi': ['error', 'always'],
	"indent": ["error", "tab"],
	'no-tabs': 'off',
	'no-restricted-globals': 'off',
	'space-before-function-paren': ['error', {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
    }],
	'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
	'func-names': ["error", "as-needed"],
	'wrap-iife': ["error", "any"],

	'import/no-unresolved': 'off',
	'import/no-extraneous-dependencies': 'off',
	'import/no-duplicates': 'off',
	'import/extensions': 'off',
	'import/no-named-as-default': 'off',
	'import/no-named-as-default-member': 'off'
  },
  globals: {
	  IGDBA: true,
	  FB: true
  }
}
