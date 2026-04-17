export default function importDeclaration(context, node) {
  const ancestors = context.sourceCode.getAncestors(node);
  return ancestors[ancestors.length - 1];
}
