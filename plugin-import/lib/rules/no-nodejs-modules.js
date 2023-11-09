import importType from '../core/importType.js';
import moduleVisitor from '../core/moduleVisitor.js';
import docsUrl from '../docsUrl.js';

function reportIfMissing(context, node, allowed, name) {
  if (allowed.indexOf(name) === -1 && importType(name, context) === 'builtin') {
    context.report(node, `Do not import Node.js builtin module "${name}"`);
  }
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Module systems',
      description: 'Forbid Node.js builtin modules.',
      url: docsUrl('no-nodejs-modules'),
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    return moduleVisitor((source, node) => {
      reportIfMissing(context, node, allowed, source.value);
    }, { commonjs: true });
  },
};
