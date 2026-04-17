/**
 * @fileOverview Forbids a module from importing itself
 * @author Gio d'Amelio
 */

import { getPhysicalFilename } from 'eslint-module-utils/contextCompat';
import resolve from '../module-utils/resolve.js';
import moduleVisitor from '../module-utils/moduleVisitor.js';

import docsUrl from '../docsUrl.js';

function isImportingSelf(context, node, requireName, moduleSystem) {
  const filePath = getPhysicalFilename(context);

  // If the input is from stdin, this test can't fail
  if (filePath !== '<text>' && filePath === resolve(requireName, context, moduleSystem)) {
    context.report({
      node,
      message: 'Module imports itself.',
    });
  }
}

export default {
  meta: {
    type: 'problem',
    docs: {
      category: 'Static analysis',
      description: 'Forbid a module from importing itself.',
      recommended: true,
      url: docsUrl('no-self-import'),
    },

    schema: [],
  },
  create(context) {
    return moduleVisitor((source, node, moduleSystem) => {
      isImportingSelf(context, node, source.value, moduleSystem);
    }, { commonjs: true });
  },
};
