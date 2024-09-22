export default function isTokenOnSameLine(left, right) {
	return left?.loc?.end.line === right?.loc?.start.line;
}
