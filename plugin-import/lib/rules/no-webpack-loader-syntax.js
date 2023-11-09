import moduleVisitor from '../core/moduleVisitor.js';
import docsUrl from '../docsUrl.js';

function reportIfNonStandard(context, node, name) {
  if (name && name.indexOf('!') !== -1) {
    context.report(node, `Unexpected '!' in '${name}'. Do not use import syntax to configure webpack loaders.`);
  }
}

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
    return moduleVisitor((source, node) => {
      reportIfNonStandard(context, node, source.value);
    }, { commonjs: true });
  },
};
