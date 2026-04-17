import path from 'path';
import { getPhysicalFilename } from 'eslint-module-utils/contextCompat';
import moduleVisitor, { makeOptionsSchema } from '../module-utils/moduleVisitor.js';

import { isAbsolute } from '../core/importType.js';
import docsUrl from '../docsUrl.js';

export default {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Static analysis',
      description: 'Forbid import of modules using absolute paths.',
      url: docsUrl('no-absolute-path'),
    },
    fixable: 'code',
    schema: [makeOptionsSchema()],
  },

  create(context) {
    function reportIfAbsolute(source) {
      if (isAbsolute(source.value)) {
        context.report({
          node: source,
          message: 'Do not import modules using an absolute path',
          fix(fixer) {
            // node.js and web imports work with posix style paths ("/")
            let relativePath = path.posix.relative(path.dirname(getPhysicalFilename(context)), source.value);
            if (!relativePath.startsWith('.')) {
              relativePath = `./${relativePath}`;
            }
            return fixer.replaceText(source, JSON.stringify(relativePath));
          },
        });
      }
    }

    const options = { esmodule: true, commonjs: true, ...context.options[0] };
    return moduleVisitor(reportIfAbsolute, options);
  },
};
