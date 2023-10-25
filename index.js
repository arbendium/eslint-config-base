import airbnbBase from 'eslint-config-airbnb-base';
import globals from 'globals';

const configurations = await Promise.all(airbnbBase.extends.map(async moduleName => {
	const { default: { ...configuration } } = await import(moduleName);

	delete configuration.parserOptions;
	delete configuration.env;

	if (configuration.plugins) {
		configuration.plugins = Object.fromEntries(
			await Promise.all(configuration.plugins.map(
				async plugin => [plugin, (await import(`eslint-plugin-${plugin}`)).default]
			))
		);
	}

	return configuration;
}));

export default [
	...configurations,
	{
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module'
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
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
			'import/no-extraneous-dependencies': 'error',
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
			'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
			'object-shorthand': ['error', 'always']
		}
	}
];
