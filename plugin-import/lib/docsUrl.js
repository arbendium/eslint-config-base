const repoUrl = 'https://github.com/import-js/eslint-plugin-import';

const packageVersion = '2.32.0';

/**
 * @param {string} ruleName
 * @param {string} commitish
 * @returns {string}
 */
export default function docsUrl(ruleName, commitish = `v${packageVersion}`) {
  return `${repoUrl}/blob/${commitish}/docs/rules/${ruleName}.md`;
}
