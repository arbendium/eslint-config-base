module.exports = {
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	},
	reportUnusedDisableDirectives: true,
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'never'],
		'consistent-return': 'off',
		'default-case': 'off',
		'func-names': 'off',
		'guard-for-in': 'off',
		'import/default': 'error',
		'import/extensions': ['error', 'ignorePackages'],
		'import/no-commonjs': 'error',
		indent: ['error', 'tab'],
		'max-classes-per-file': 'off',
		'newline-before-return': 'error',
		'no-await-in-loop': 'off',
		'no-confusing-arrow': 'off',
		'no-continue': 'off',
		'no-mixed-operators': 'off',
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-restricted-exports': 'off',
		'no-restricted-syntax': 'off',
		'no-shadow': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-use-before-define': ['error', { functions: false, classes: false, variables: false }]
	}
};
