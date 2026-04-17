import noUnresolved from './rules/no-unresolved.js';
import named from './rules/named.js';
import ruleDefault from './rules/default.js';
import namespace from './rules/namespace.js';
import noNamespace from './rules/no-namespace.js';
import ruleExport from './rules/export.js';
import noMutableExports from './rules/no-mutable-exports.js';
import extensions from './rules/extensions.js';
import noRestrictedPaths from './rules/no-restricted-paths.js';
import noInternalModules from './rules/no-internal-modules.js';
import groupExports from './rules/group-exports.js';
import noRelativePackages from './rules/no-relative-packages.js';
import noRelativeParentImports from './rules/no-relative-parent-imports.js';
import consistentTypeSpecifierStyle from './rules/consistent-type-specifier-style.js';
import noSelfImport from './rules/no-self-import.js';
import noCycle from './rules/no-cycle.js';
import noNamedDefault from './rules/no-named-default.js';
import noNamedAsDefault from './rules/no-named-as-default.js';
import noNamedAsDefaultMember from './rules/no-named-as-default-member.js';
import noAnonymousDefaultExport from './rules/no-anonymous-default-export.js';
import noUnusedModules from './rules/no-unused-modules.js';
import noCommonjs from './rules/no-commonjs.js';
import noAmd from './rules/no-amd.js';
import noDuplicates from './rules/no-duplicates.js';
import first from './rules/first.js';
import maxDependencies from './rules/max-dependencies.js';
import noExtraneousDependencies from './rules/no-extraneous-dependencies.js';
import noAbsolutePath from './rules/no-absolute-path.js';
import noNodejsModules from './rules/no-nodejs-modules.js';
import noWebpackLoaderSyntax from './rules/no-webpack-loader-syntax.js';
import order from './rules/order.js';
import newlineAfterImport from './rules/newline-after-import.js';
import preferDefaultExport from './rules/prefer-default-export.js';
import noDefaultExport from './rules/no-default-export.js';
import noNamedExport from './rules/no-named-export.js';
import noDynamicRequire from './rules/no-dynamic-require.js';
import unambiguous from './rules/unambiguous.js';
import noUnassignedImport from './rules/no-unassigned-import.js';
import noUselessPathSegments from './rules/no-useless-path-segments.js';
import dynamicImportChunkname from './rules/dynamic-import-chunkname.js';
import noImportModuleExports from './rules/no-import-module-exports.js';
import noEmptyNamedBlocks from './rules/no-empty-named-blocks.js';
import exportsLast from './rules/exports-last.js';
import noDeprecated from './rules/no-deprecated.js';
import importsFirst from './rules/imports-first.js';

// eslint-disable-next-line import/prefer-default-export
export const rules = {
	'no-unresolved': noUnresolved,
	named,
	default: ruleDefault,
	namespace,
	'no-namespace': noNamespace,
	export: ruleExport,
	'no-mutable-exports': noMutableExports,
	extensions,
	'no-restricted-paths': noRestrictedPaths,
	'no-internal-modules': noInternalModules,
	'group-exports': groupExports,
	'no-relative-packages': noRelativePackages,
	'no-relative-parent-imports': noRelativeParentImports,
	'consistent-type-specifier-style': consistentTypeSpecifierStyle,

	'no-self-import': noSelfImport,
	'no-cycle': noCycle,
	'no-named-default': noNamedDefault,
	'no-named-as-default': noNamedAsDefault,
	'no-named-as-default-member': noNamedAsDefaultMember,
	'no-anonymous-default-export': noAnonymousDefaultExport,
	'no-unused-modules': noUnusedModules,

	'no-commonjs': noCommonjs,
	'no-amd': noAmd,
	'no-duplicates': noDuplicates,
	first,
	'max-dependencies': maxDependencies,
	'no-extraneous-dependencies': noExtraneousDependencies,
	'no-absolute-path': noAbsolutePath,
	'no-nodejs-modules': noNodejsModules,
	'no-webpack-loader-syntax': noWebpackLoaderSyntax,
	order,
	'newline-after-import': newlineAfterImport,
	'prefer-default-export': preferDefaultExport,
	'no-default-export': noDefaultExport,
	'no-named-export': noNamedExport,
	'no-dynamic-require': noDynamicRequire,
	unambiguous,
	'no-unassigned-import': noUnassignedImport,
	'no-useless-path-segments': noUselessPathSegments,
	'dynamic-import-chunkname': dynamicImportChunkname,
	'no-import-module-exports': noImportModuleExports,
	'no-empty-named-blocks': noEmptyNamedBlocks,

	// export
	'exports-last': exportsLast,

	// metadata-based
	'no-deprecated': noDeprecated,

	// deprecated aliases to rules
	'imports-first': importsFirst
};
