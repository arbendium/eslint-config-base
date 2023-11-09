const repoUrl = 'https://github.com/import-js/eslint-plugin-import';

const packageVersion = '2.29.0';

export default function docsUrl(ruleName, commitish = `v${packageVersion}`) {
  return `${repoUrl}/blob/${commitish}/docs/rules/${ruleName}.md`;
}
