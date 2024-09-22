import createRule from '../createRule.js';
import isTokenOnSameLine from '../isTokenOnSameLine.js';
import baseRule from './brace-style._js_.js';

export default createRule({
	name: 'brace-style',
	package: 'ts',
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce consistent brace style for blocks'
		},
		messages: baseRule.meta.messages,
		fixable: baseRule.meta.fixable,
		hasSuggestions: baseRule.meta.hasSuggestions,
		schema: baseRule.meta.schema
	},
	defaultOptions: ['1tbs'],
	create(context) {
		const [
			style = '1tbs',
			{ allowSingleLine = false } = {}
		] = context.options;

		const isAllmanStyle = style === 'allman';
		const { sourceCode } = context;
		const rules = baseRule.create(context);

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
		 */
		function validateCurlyPair(openingCurly, closingCurly) {
			if (allowSingleLine && isTokenOnSameLine(openingCurly, closingCurly)) {
				return;
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

		return {
			...rules,
			'TSInterfaceBody, TSModuleBlock'(node) {
				const openingCurly = sourceCode.getFirstToken(node);
				const closingCurly = sourceCode.getLastToken(node);

				validateCurlyPair(openingCurly, closingCurly);
			},
			TSEnumDeclaration(node) {
				const closingCurly = sourceCode.getLastToken(node);
				const members = node.body?.members || node.members;
				const openingCurly = sourceCode.getTokenBefore(
					members.length ? members[0] : closingCurly
				);

				validateCurlyPair(openingCurly, closingCurly);
			}
		};
	}
});
