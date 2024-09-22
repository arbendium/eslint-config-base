/**
 * @fileoverview Rule to flag block statements that do not use the one true brace style
 * @author Ian Christian Myers
 */

/* eslint-disable stylistic/max-len */

import createRule from '../createRule.js';
import isTokenOnSameLine from '../isTokenOnSameLine.js';

const STATEMENT_LIST_PARENTS = new Set(['Program', 'BlockStatement', 'StaticBlock', 'SwitchCase']);

export default createRule({
	name: 'brace-style',
	package: 'js',
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce consistent brace style for blocks'
		},
		schema: [
			{
				type: 'string',
				enum: ['1tbs', 'stroustrup', 'allman']
			},
			{
				type: 'object',
				properties: {
					allowSingleLine: {
						type: 'boolean',
						default: false
					},
					allowSingleLineFunctionBody: {
						type: 'boolean',
						default: false
					}
				},
				additionalProperties: false
			}
		],
		fixable: 'whitespace',
		messages: {
			nextLineOpen: 'Opening curly brace does not appear on the same line as controlling statement.',
			sameLineOpen: 'Opening curly brace appears on the same line as controlling statement.',
			blockSameLine: 'Statement inside of curly braces should be on next line.',
			nextLineClose: 'Closing curly brace does not appear on the same line as the subsequent block.',
			singleLineClose: 'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.',
			sameLineClose: 'Closing curly brace appears on the same line as the subsequent block.'
		}
	},
	defaultOptions: ['1tbs'],
	create(context) {
		const [
			style = '1tbs',
			{ allowSingleLine = false, allowSingleLineFunctionBody = false } = {}
		] = context.options;

		const isAllmanStyle = style === 'allman';
		const { sourceCode } = context;

		/**
		 * Fixes a place where a newline unexpectedly appears
		 * @param firstToken The token before the unexpected newline
		 * @param secondToken The token after the unexpected newline
		 * @returns A fixer function to remove the newlines between the tokens
		 */
		function removeNewlineBetween(firstToken, secondToken) {
			return fixer => {
				const textRange = [firstToken.range[1], secondToken.range[0]];
				const textBetween = sourceCode.text.slice(textRange[0], textRange[1]);

				// Don't do a fix if there is a comment between the tokens
				if (!textBetween.trim()) {
					return fixer.replaceTextRange(textRange, ' ');
				}
			};
		}

		/**
		 * Validates a pair of curly brackets based on the user's config
		 * @param openingCurly The opening curly bracket
		 * @param closingCurly The closing curly bracket
		 * @param statementType Parent statement type
		 */
		function validateCurlyPair(openingCurly, closingCurly, statementType) {
			if (isTokenOnSameLine(openingCurly, closingCurly)) {
				if (allowSingleLine) {
					return;
				}

				if (allowSingleLineFunctionBody && ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(statementType)) {
					return;
				}
			}

			const tokenBeforeOpeningCurly = sourceCode.getTokenBefore(openingCurly);
			const tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurly);
			const tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurly);

			if (!isAllmanStyle && !isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly)) {
				context.report({
					node: openingCurly,
					messageId: 'nextLineOpen',
					fix: removeNewlineBetween(
						tokenBeforeOpeningCurly,
						openingCurly
					)
				});
			}

			if (isAllmanStyle && isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly)) {
				context.report({
					node: openingCurly,
					messageId: 'sameLineOpen',
					fix: fixer => fixer.insertTextBefore(openingCurly, '\n')
				});
			}

			if (tokenAfterOpeningCurly !== closingCurly
				&& isTokenOnSameLine(openingCurly, tokenAfterOpeningCurly)) {
				context.report({
					node: openingCurly,
					messageId: 'blockSameLine',
					fix: fixer => fixer.insertTextAfter(openingCurly, '\n')
				});
			}

			if (tokenBeforeClosingCurly !== openingCurly
				&& isTokenOnSameLine(tokenBeforeClosingCurly, closingCurly)) {
				context.report({
					node: closingCurly,
					messageId: 'singleLineClose',
					fix: fixer => fixer.insertTextBefore(closingCurly, '\n')
				});
			}
		}

		/**
		 * Validates the location of a token that appears before a keyword (e.g. a newline before `else`)
		 * @param curlyToken The closing curly token. This is assumed to precede a keyword token (such as `else` or `finally`).
		 */
		function validateCurlyBeforeKeyword(curlyToken) {
			const keywordToken = sourceCode.getTokenAfter(curlyToken);

			if (style === '1tbs' && !isTokenOnSameLine(curlyToken, keywordToken)) {
				context.report({
					node: curlyToken,
					messageId: 'nextLineClose',
					fix: removeNewlineBetween(curlyToken, keywordToken)
				});
			}

			if (style !== '1tbs' && isTokenOnSameLine(curlyToken, keywordToken)) {
				context.report({
					node: curlyToken,
					messageId: 'sameLineClose',
					fix: fixer => fixer.insertTextAfter(curlyToken, '\n')
				});
			}
		}

		return {
			BlockStatement(node) {
				if (!STATEMENT_LIST_PARENTS.has(node.parent.type)) {
					validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node), node.parent.type);
				}
			},
			StaticBlock(node) {
				validateCurlyPair(
					sourceCode.getFirstToken(node, { skip: 1 }), // skip the `static` token
					sourceCode.getLastToken(node)
				);
			},
			ClassBody(node) {
				validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
			},
			SwitchStatement(node) {
				const closingCurly = sourceCode.getLastToken(node);
				const openingCurly = sourceCode.getTokenBefore(
					node.cases.length ? node.cases[0] : closingCurly
				);

				validateCurlyPair(openingCurly, closingCurly);
			},
			IfStatement(node) {
				if (node.consequent.type === 'BlockStatement' && node.alternate) {
					// Handle the keyword after the `if` block (before `else`)
					validateCurlyBeforeKeyword(sourceCode.getLastToken(node.consequent));
				}
			},
			TryStatement(node) {
				// Handle the keyword after the `try` block (before `catch` or `finally`)
				validateCurlyBeforeKeyword(sourceCode.getLastToken(node.block));

				if (node.handler && node.finalizer) {
					// Handle the keyword after the `catch` block (before `finally`)
					validateCurlyBeforeKeyword(sourceCode.getLastToken(node.handler.body));
				}
			}
		};
	}
});
