export default function getInitials(fullname) {
	/*
	 * The regex here is looking for an optional, single
	 * leading character, followed by 0 or more additional
	 * characters (this should match the first name), 
	 * separated by 0 or more spaces (probably should be
	 * one or more?), followed by an optional character,
	 * which should be the first letter of the last name
	 * (probably shouldn't be optional?).
	 * 
	 * This would be my regex: \w+\s+\w
	 * 
	 * However, if that regex were used, the return value 
	 * from:
	 * 
	 * "Richard Memory"..match(/\w+\s+\w/) is just 
	 * "Richard M", and slice(1) returns an empty array.
	 * 
	 * Thus, the parenthesis have purpose, and indeed
	 * the reg used below is accurate:
	 * 
	 * "Richard Memory".match(/(\w)?\w*\s*(\w)?/)
	 * 
	 * returns:
	 * 
	 * ["Richard M", "R", "M"], and 
	 * 
	 * "Richard Memory".match(/(\w)?\w*\s*(\w)?/).slice(1)
	 * returns ["R", "M"], which is the desired result.
	 */
	const match = fullname.match(/(\w)?\w*\s*(\w)?/);
	return match ? match.slice(1).join('') : '';
}
