import docsUrl from '../docsUrl.js';
import first from './first.js';

const newMeta = {
  ...first.meta,
  deprecated: true,
  docs: {
    category: 'Style guide',
    description: 'Replaced by `import/first`.',
    url: docsUrl('imports-first', '7b25c1cb95ee18acc1531002fd343e1e6031f9ed'),
  },
};

export default { ...first, meta: newMeta };
