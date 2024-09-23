import globals from 'globals';
import pluginStylistic from '@stylistic/eslint-plugin';
import * as pluginArbendium from './plugin-arbendium/index.js';
import * as pluginImport from './plugin-import/lib/index.js';

export default [
	{
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.mjs', '.js', '.json']
				}
			},
			'import/extensions': ['.js', '.mjs', '.jsx'],
			'import/core-modules': [],
			'import/ignore': [
				'node_modules',
				'\\.(coffee|scss|css|less|hbs|svg|json)$'
			]
		},
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		plugins: {
			arbendium: pluginArbendium,
			import: pluginImport,
			stylistic: pluginStylistic
		},
		rules: {
			'arbendium/curly-newline': ['error', {
				minElements: 0,
				ArrowFunctionExpression: { consistent: true, minElements: 4, multiline: true },
				ClassBody: { consistent: true, minElements: 4, multiline: true },
				FunctionDeclaration: { consistent: true, minElements: 4, multiline: true },
				FunctionExpression: { consistent: true, minElements: 4, multiline: true },
				Property: { consistent: true, minElements: 4, multiline: true }
			}],
			'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
			'block-scoped-var': 'error',
			camelcase: ['error', {
				ignoreDestructuring: false,
				ignoreGlobals: false,
				ignoreImports: false,
				properties: 'never'
			}],
			'class-methods-use-this': ['error', { enforceForClassFields: true, exceptMethods: [] }],
			'constructor-super': 'error',
			curly: ['error', 'all'],
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': ['error', { allowKeywords: true, allowPattern: '' }],
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'for-direction': 'error',
			'getter-return': ['error', { allowImplicit: true }],
			'global-require': 'error',
			'grouped-accessor-pairs': 'error',
			'import/default': 'error',
			'import/export': 'error',
			'import/extensions': ['error', 'ignorePackages'],
			'import/first': 'error',
			'import/named': 'error',
			'import/newline-after-import': 'error',
			'import/no-absolute-path': 'error',
			'import/no-amd': 'error',
			'import/no-commonjs': 'error',
			'import/no-cycle': ['error', { allowUnsafeDynamicCyclicDependency: false, ignoreExternal: false, maxDepth: '∞' }],
			'import/no-duplicates': 'error',
			'import/no-dynamic-require': 'error',
			'import/no-extraneous-dependencies': 'error',
			'import/no-import-module-exports': ['error', { exceptions: [] }],
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default': 'error',
			'import/no-named-as-default-member': 'error',
			'import/no-named-default': 'error',
			'import/no-relative-packages': 'error',
			'import/no-self-import': 'error',
			'import/no-unresolved': ['error', { caseSensitive: true, caseSensitiveStrict: false, commonjs: true }],
			'import/no-useless-path-segments': ['error', { commonjs: true }],
			'import/no-webpack-loader-syntax': 'error',
			'import/order': ['error', { distinctGroup: true, groups: [['builtin', 'external', 'internal']], warnOnUnassignedImports: false }],
			'import/prefer-default-export': 'error',
			'lines-around-directive': ['error', { before: 'always', after: 'always' }],
			'new-cap': ['error', {
				capIsNew: false,
				newIsCap: true,
				newIsCapExceptions: [],
				properties: true
			}],
			'no-alert': 'warn',
			'no-array-constructor': 'error',
			'no-async-promise-executor': 'error',
			'no-bitwise': 'error',
			'no-buffer-constructor': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': ['error', 'always'],
			'no-console': 'warn',
			'no-const-assign': 'error',
			'no-constant-condition': 'warn',
			'no-constructor-return': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-delete-var': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-else-return': ['error', { allowElseIf: false }],
			'no-empty': 'error',
			'no-empty-character-class': 'error',
			'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
			'no-empty-pattern': 'error',
			'no-eval': 'error',
			'no-ex-assign': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-label': 'error',
			'no-fallthrough': 'error',
			'no-func-assign': 'error',
			'no-global-assign': ['error', { exceptions: [] }],
			'no-implied-eval': 'error',
			'no-import-assign': 'error',
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-multi-assign': 'error',
			'no-multi-str': 'error',
			'no-nested-ternary': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-object': 'error',
			'no-new-require': 'error',
			'no-new-symbol': 'error',
			'no-new-wrappers': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-obj-calls': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-path-concat': 'error',
			'no-promise-executor-return': 'error',
			'no-proto': 'error',
			'no-prototype-builtins': 'error',
			'no-redeclare': 'error',
			'no-regex-spaces': 'error',
			'no-restricted-globals': [
				'error',
				{ name: 'isFinite', message: 'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite' },
				{ name: 'isNaN', message: 'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan' },
				'addEventListener', 'blur', 'close', 'closed', 'confirm', 'defaultStatus', 'defaultstatus', 'event', 'external', 'find', 'focus', 'frameElement', 'frames', 'history', 'innerHeight', 'innerWidth', 'length', 'location', 'locationbar', 'menubar', 'moveBy', 'moveTo', 'name', 'onblur', 'onerror', 'onfocus', 'onload', 'onresize', 'onunload', 'open', 'opener', 'opera', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent', 'print', 'removeEventListener', 'resizeBy', 'resizeTo', 'screen', 'screenLeft', 'screenTop', 'screenX', 'screenY', 'scroll', 'scrollbars', 'scrollBy', 'scrollTo', 'scrollX', 'scrollY', 'self', 'status', 'statusbar', 'stop', 'toolbar', 'top'
			],
			'no-restricted-properties': [
				'error',
				{ object: 'arguments', property: 'callee', message: 'arguments.callee is deprecated' },
				{ object: 'global', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'self', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'window', property: 'isFinite', message: 'Please use Number.isFinite instead' },
				{ object: 'global', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ object: 'self', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ object: 'window', property: 'isNaN', message: 'Please use Number.isNaN instead' },
				{ property: '__defineGetter__', message: 'Please use Object.defineProperty instead.' },
				{ property: '__defineSetter__', message: 'Please use Object.defineProperty instead.' },
				{ object: 'Math', property: 'pow', message: 'Use the exponentiation operator (**) instead.' }
			],
			'no-return-assign': ['error', 'always'],
			'no-return-await': 'error',
			'no-script-url': 'error',
			'no-self-assign': ['error', { props: true }],
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-setter-return': 'error',
			'no-shadow-restricted-names': 'error',
			'no-spaced-func': 'error',
			'no-sparse-arrays': 'error',
			'no-template-curly-in-string': 'error',
			'no-this-before-super': 'error',
			'no-throw-literal': 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-underscore-dangle': ['error', {
				allow: [],
				allowAfterSuper: false,
				allowAfterThis: false,
				allowAfterThisConstructor: false,
				allowFunctionParams: true,
				allowInArrayDestructuring: true,
				allowInObjectDestructuring: true,
				enforceInClassFields: false,
				enforceInMethodNames: true
			}],
			'no-unexpected-multiline': 'error',
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'no-unreachable': 'error',
			'no-unreachable-loop': ['error', { ignore: [] }],
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
			'no-unused-expressions': ['error', {
				allowShortCircuit: false,
				allowTaggedTemplates: false,
				allowTernary: false,
				enforceForJSX: false
			}],
			'no-unused-labels': 'error',
			'no-unused-vars': ['error', { args: 'after-used', ignoreRestSiblings: true, vars: 'all' }],
			'no-use-before-define': ['error', { classes: false, functions: false, variables: false }],
			'no-useless-backreference': 'error',
			'no-useless-catch': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': ['error', { ignoreDestructuring: false, ignoreExport: false, ignoreImport: false }],
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-with': 'error',
			'object-shorthand': ['error', 'always'],
			'one-var': ['error', 'never'],
			'operator-assignment': ['error', 'always'],
			'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
			'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
			'prefer-destructuring': [
				'error',
				{
					AssignmentExpression: { array: true, object: false },
					VariableDeclarator: { array: false, object: true }
				},
				{ enforceForRenamedProperties: false }],
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
			'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			radix: 'error',
			'require-yield': 'error',
			strict: ['error', 'never'],
			'stylistic/array-bracket-spacing': ['error', 'never'],
			'stylistic/arrow-parens': ['error', 'as-needed'],
			'stylistic/arrow-spacing': ['error', { before: true, after: true }],
			'stylistic/block-spacing': ['error', 'always'],
			'stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'stylistic/comma-dangle': ['error', 'never'],
			'stylistic/comma-spacing': ['error', { before: false, after: true }],
			'stylistic/comma-style': ['error', 'last', {
				exceptions: {
					ArrayExpression: false,
					ArrayPattern: false,
					ArrowFunctionExpression: false,
					CallExpression: false,
					FunctionDeclaration: false,
					FunctionExpression: false,
					ImportDeclaration: false,
					NewExpression: false,
					ObjectExpression: false,
					ObjectPattern: false,
					VariableDeclaration: false
				}
			}],
			'stylistic/computed-property-spacing': ['error', 'never'],
			'stylistic/dot-location': ['error', 'property'],
			'stylistic/eol-last': ['error', 'always'],
			'stylistic/func-call-spacing': ['error', 'never'],
			'stylistic/function-call-argument-newline': ['error', 'consistent'],
			'stylistic/function-paren-newline': ['error', 'multiline-arguments'],
			'stylistic/generator-star-spacing': ['error', { before: false, after: true }],
			'stylistic/implicit-arrow-linebreak': ['error', 'beside'],
			'stylistic/indent': ['error', 'tab', { SwitchCase: 0 }],
			'stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'stylistic/keyword-spacing': ['error', {
				before: true,
				after: true,
				overrides: {
					case: { after: true },
					return: { after: true },
					throw: { after: true }
				}
			}],
			'stylistic/linebreak-style': ['error', 'unix'],
			'stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
			'stylistic/max-len': ['error', 100, 2, {
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true
			}],
			'stylistic/new-parens': 'error',
			'stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
			'stylistic/no-extra-semi': 'error',
			'stylistic/no-floating-decimal': 'error',
			'stylistic/no-mixed-spaces-and-tabs': 'error',
			'stylistic/no-multi-spaces': ['error', { ignoreEOLComments: false }],
			'stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
			'stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
			'stylistic/no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],
			'stylistic/no-whitespace-before-property': 'error',
			'stylistic/nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
			'stylistic/object-curly-newline': ['error', {
				ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
				ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
				ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
				ObjectPattern: { minProperties: 4, multiline: true, consistent: true }
			}],
			'stylistic/object-curly-spacing': ['error', 'always'],
			'stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true, allowMultiplePropertiesPerLine: false }],
			'stylistic/one-var-declaration-per-line': ['error', 'always'],
			'stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
			'stylistic/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }, { allowSingleLineBlocks: true }],
			'stylistic/padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: '*', next: 'throw' },
				{ blankLine: 'never', prev: 'import', next: 'import' },
				{ blankLine: 'always', prev: 'block-like', next: '*' },
				{ blankLine: 'always', prev: '*', next: 'block-like' }
			],
			'stylistic/quote-props': ['error', 'as-needed', { numbers: false, keywords: false, unnecessary: true }],
			'stylistic/quotes': ['error', 'single', { avoidEscape: false }],
			'stylistic/rest-spread-spacing': ['error', 'never'],
			'stylistic/semi': ['error', 'always'],
			'stylistic/semi-spacing': ['error', { before: false, after: true }],
			'stylistic/semi-style': ['error', 'last'],
			'stylistic/space-before-blocks': 'error',
			'stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
			'stylistic/space-in-parens': ['error', 'never'],
			'stylistic/space-infix-ops': 'error',
			'stylistic/space-unary-ops': ['error', { nonwords: false, overrides: {}, words: true }],
			'stylistic/spaced-comment': ['error', 'always', { block: { exceptions: ['-', '+'], markers: ['=', '!', ':', '::'], balanced: true }, line: { exceptions: ['-', '+'], markers: ['=', '!', '/'] } }],
			'stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
			'stylistic/template-curly-spacing': 'error',
			'stylistic/template-tag-spacing': ['error', 'never'],
			'stylistic/wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
			'stylistic/yield-star-spacing': ['error', 'after'],
			'symbol-description': 'error',
			'unicode-bom': ['error', 'never'],
			'use-isnan': 'error',
			'valid-typeof': ['error', { requireStringLiterals: true }],
			'vars-on-top': 'error',
			yoda: 'error'
		}
	}
];
