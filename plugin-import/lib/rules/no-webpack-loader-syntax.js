import moduleVisitor from 'eslint-module-utils/moduleVisitor';
import docsUrl from '../docsUrl.js';

/**
 * @import { Rule } from 'eslint'
 * @import { Node } from 'estree'
 */

/**
 *
 * @param {Rule.RuleContext} context
 * @param {Node} node
 * @param {string} name
 */
function reportIfNonStandard(context, node, name) {
  if (name && name.indexOf('!') !== -1) {
    context.report({
      message: `Unexpected '!' in '${name}'. Do not use import syntax to configure webpack loaders.`,
      node
    });
  }
}

/** @type {Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      category: 'Static analysis',
      description: 'Forbid webpack loader syntax in imports.',
      url: docsUrl('no-webpack-loader-syntax'),
    },
    schema: [],
  },

  create(context) {
    return moduleVisitor(
      (source, node) => {
        reportIfNonStandard(context, node, source.value);
      },
      { commonjs: true }
    );
  },
};
