// Convert an arbitrary string into an RGB color
export default function getAvatarColor(name) {
  const hexCode = name //'DEADBEEF'
	.split('') // 'D', 'E', 'A', 'D', 'B', 'E'. 'E', 'F'
	/* 
	 * charCodeAt(0) returns the ascii value for each letter in 
	 * the input string, the mod of 0xffffff caps the accumulated
	 * value at a max of 0xffffff (ie. a color of white). In other
	 * words, reduce just loops over all of the characters in the 
	 * input string, getting the ascii value for each, multiplying
	 * it times the current acc value in the loop, capping the 
	 * overall value at 0xffffff, and eventually returning whatever
	 * RGB color results from this loop.
	 */
	.reduce((acc, char) => (acc * char.charCodeAt(0)) % 0xffffff, 1)
	/*
	 * The 16 here is a radix value, which transforms the value into
	 * a base 16 (hex) string.
	 */
	.toString(16);

  return `#${'0'.repeat(6 - hexCode.length) + hexCode}`;
}
