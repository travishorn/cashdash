/**
 * @param {number} depth - The level of depth to indent the text
 * @returns {string} The original text, indented to the given depth
 */
export function indentation(depth) {
	return Array(depth).fill('&nbsp;&nbsp;&nbsp;&nbsp;').join('');
}
