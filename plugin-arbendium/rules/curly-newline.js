// temporary rule from https://github.com/eslint-stylistic/eslint-stylistic/pull/548

function isCommentToken(token) {
	return token && (token.type === 'Line' || token.type === 'Block' || token.type === 'Shebang');
}

function isTokenOnSameLine(left, right) {
	return left?.loc?.end.line === right?.loc?.start.line;
}

const commonProperties = {
	multiline: {
		type: 'boolean'
	},
	minElements: {
		type: 'integer',
		minimum: 0
	},
	consistent: {
		type: 'boolean'
	}
};

const optionValueSchema = {
	oneOf: [
		{
			type: 'string',
			enum: ['always', 'never']
		},
		{
			type: 'object',
			properties: commonProperties,
			additionalProperties: false
		}
	]
};

const Specialization = {
	// if
	IfStatementConsequent: 'IfStatementConsequent',
	IfStatementAlternative: 'IfStatementAlternative',

	// loops
	DoWhileStatement: 'DoWhileStatement',
	ForInStatement: 'ForInStatement',
	ForOfStatement: 'ForOfStatement',
	ForStatement: 'ForStatement',
	WhileStatement: 'WhileStatement',

	// switch-case
	SwitchStatement: 'SwitchStatement',
	SwitchCase: 'SwitchCase',

	// try
	TryStatementBlock: 'TryStatementBlock',
	TryStatementHandler: 'TryStatementHandler',
	TryStatementFinalizer: 'TryStatementFinalizer',

	// lone block
	BlockStatement: 'BlockStatement',

	// functions
	ArrowFunctionExpression: 'ArrowFunctionExpression',
	FunctionDeclaration: 'FunctionDeclaration',
	FunctionExpression: 'FunctionExpression',
	Property: 'Property',

	// block-like
	ClassBody: 'ClassBody',
	StaticBlock: 'StaticBlock',

	// misc
	WithStatement: 'WithStatement',

	// typescript
	TSEnumBody: 'TSEnumBody',
	TSInterfaceBody: 'TSInterfaceBody',
	TSModuleBlock: 'TSModuleBlock'
};

const presets = {
	default: { multiline: false, minElements: Number.POSITIVE_INFINITY, consistent: true },
	always: { multiline: false, minElements: 0, consistent: false },
	never: { multiline: false, minElements: Number.POSITIVE_INFINITY, consistent: false }
};

function normalizeOptionValue(value) {
	if (value === 'always') {
		return presets.always;
	}

	if (value === 'never') {
		return presets.never;
	}

	if (value) {
		return {
			consistent: !!value.consistent,
			minElements: value.minElements ?? Number.POSITIVE_INFINITY,
			multiline: !!value.multiline
		};
	}

	return presets.default;
}

function normalizeOptions(options) {
	const value = normalizeOptionValue(options);

	return Object.fromEntries(
		Object.entries(Specialization).map(([k]) => [
			k,
			typeof options === 'object' && options != null && k in options ? normalizeOptionValue(options[k]) : value
		])
	);
}

export const meta = {
	type: 'layout',
	docs: {
		description: 'Enforce consistent line breaks after opening and before closing braces'
	},
	fixable: 'whitespace',
	schema: [
		{
			oneOf: [
				{
					type: 'string',
					enum: ['always', 'never']
				},
				{
					type: 'object',
					properties: {
						...Object.fromEntries(Object.entries(Specialization).map(
							([k]) => [k, optionValueSchema]
						)),
						...commonProperties
					},
					additionalProperties: false
				}
			]
		}
	],
	messages: {
		unexpectedLinebreakBeforeClosingBrace: 'Unexpected line break before this closing brace.',
		unexpectedLinebreakAfterOpeningBrace: 'Unexpected line break after this opening brace.',
		expectedLinebreakBeforeClosingBrace: 'Expected a line break before this closing brace.',
		expectedLinebreakAfterOpeningBrace: 'Expected a line break after this opening brace.'
	}
};

export function create(context) {
	const { sourceCode } = context;
	const normalizedOptions = normalizeOptions(context.options[0]);

	/**
		 * Reports a given node if it violated this rule.
		 * @param node A node to check. This is an ObjectExpression, ObjectPattern, ImportDeclaration,
		 *   ExportNamedDeclaration, TSTypeLiteral or TSInterfaceBody node.
		 */
	function check(node, specialization) {
		const options = normalizedOptions[specialization];

		let openBrace;
		let closeBrace;
		let elementCount;

		switch (node.type) {
		case 'SwitchStatement':
			closeBrace = sourceCode.getLastToken(node);
			openBrace = sourceCode.getTokenBefore(node.cases.length ? node.cases[0] : closeBrace);
			elementCount = node.cases.length;
			break;
		case 'StaticBlock':
			openBrace = sourceCode.getFirstToken(node, token => token.value === '{');
			closeBrace = sourceCode.getLastToken(node);
			elementCount = node.body.length;
			break;
		case 'TSEnumBody':
			openBrace = sourceCode.getFirstToken(node);
			closeBrace = sourceCode.getLastToken(node);
			elementCount = node.members.length;
			break;
		default:
			openBrace = sourceCode.getFirstToken(node);
			closeBrace = sourceCode.getLastToken(node);
			elementCount = node.body.length;
		}

		let first = sourceCode.getTokenAfter(openBrace, { includeComments: true });
		let last = sourceCode.getTokenBefore(closeBrace, { includeComments: true });

		const needsLineBreaks = elementCount >= options.minElements
				|| (options.multiline && elementCount > 0 && first.loc.start.line !== last.loc.end.line);

		const hasCommentsFirstToken = isCommentToken(first);
		const hasCommentsLastToken = isCommentToken(last);

		/**
		 * Use tokens or comments to check multiline or not.
		 * But use only tokens to check whether line breaks are needed.
		 * This allows:
		 *     if (...) { // eslint-disable-line foo
		 *         ...
		 *     }
		 */
		first = sourceCode.getTokenAfter(openBrace);
		last = sourceCode.getTokenBefore(closeBrace);

		if (needsLineBreaks) {
			if (isTokenOnSameLine(openBrace, first)) {
				context.report({
					messageId: 'expectedLinebreakAfterOpeningBrace',
					node,
					loc: openBrace.loc,
					fix(fixer) {
						if (hasCommentsFirstToken) {
							return null;
						}

						return fixer.insertTextAfter(openBrace, '\n');
					}
				});
			}

			if (isTokenOnSameLine(last, closeBrace)) {
				context.report({
					messageId: 'expectedLinebreakBeforeClosingBrace',
					node,
					loc: closeBrace.loc,
					fix(fixer) {
						if (hasCommentsLastToken) {
							return null;
						}

						return fixer.insertTextBefore(closeBrace, '\n');
					}
				});
			}
		} else {
			const { consistent } = options;
			const hasLineBreakBetweenOpenBraceAndFirst = !isTokenOnSameLine(openBrace, first);
			const hasLineBreakBetweenCloseBraceAndLast = !isTokenOnSameLine(last, closeBrace);

			if (
				(!consistent && hasLineBreakBetweenOpenBraceAndFirst)
					|| (consistent && hasLineBreakBetweenOpenBraceAndFirst
						&& !hasLineBreakBetweenCloseBraceAndLast)
			) {
				context.report({
					messageId: 'unexpectedLinebreakAfterOpeningBrace',
					node,
					loc: openBrace.loc,
					fix(fixer) {
						if (hasCommentsFirstToken) {
							return null;
						}

						return fixer.removeRange([
							openBrace.range[1],
							first.range[0]
						]);
					}
				});
			}

			if (
				(!consistent && hasLineBreakBetweenCloseBraceAndLast)
					|| (consistent && !hasLineBreakBetweenOpenBraceAndFirst
						&& hasLineBreakBetweenCloseBraceAndLast)
			) {
				context.report({
					messageId: 'unexpectedLinebreakBeforeClosingBrace',
					node,
					loc: closeBrace.loc,
					fix(fixer) {
						if (hasCommentsLastToken) {
							return null;
						}

						return fixer.removeRange([
							last.range[1],
							closeBrace.range[0]
						]);
					}
				});
			}
		}
	}

	function checkBlockLike(node) {
		check(node, node.type);
	}

	return {
		BlockStatement(node) {
			const { parent } = node;

			switch (parent.type) {
			case 'DoWhileStatement':
			case 'ForInStatement':
			case 'ForOfStatement':
			case 'ForStatement':
			case 'WhileStatement':
			case 'ArrowFunctionExpression':
			case 'FunctionDeclaration':
			case 'WithStatement':
				check(node, parent.type);

				break;
			case 'FunctionExpression':
				if (parent.parent.type === 'Property' && parent.parent.method) {
					check(node, 'Property');
				} else {
					check(node, parent.type);
				}

				break;
			case 'IfStatement':
				if (node === parent.consequent) {
					check(node, 'IfStatementConsequent');
				}

				if (node === parent.alternate) {
					check(node, 'IfStatementAlternative');
				}

				break;
			case 'TryStatement':
				if (node === parent.block) {
					check(node, 'TryStatementBlock');
				}

				if (node === parent.finalizer) {
					check(node, 'TryStatementFinalizer');
				}

				break;
			case 'CatchClause':
				check(node, 'TryStatementHandler');

				break;

			default:
				if (parent.type === 'SwitchCase' && parent.consequent.length === 1) {
					check(node, 'SwitchCase');
				} else {
					check(node, 'BlockStatement');
				}
			}
		},
		SwitchStatement: checkBlockLike,
		ClassBody: checkBlockLike,
		StaticBlock: checkBlockLike,
		TSEnumBody: checkBlockLike,
		TSInterfaceBody: checkBlockLike,
		TSModuleBlock: checkBlockLike
	};
}
