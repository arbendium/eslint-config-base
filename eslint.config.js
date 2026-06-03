import base from './index.js';

export default [
	...base,
	{
		files: ['plugin-import/**/*.js'],
		rules: {
			'stylistic/indent': ['error', 2],
		},
	},
	{
		files: ['plugin-import/lib/index.js'],
		rules: {
			'stylistic/indent': ['error', 'tab'],
		},
	},
	// {
	// 	ignores: ['plugin-import']
	// }
];
