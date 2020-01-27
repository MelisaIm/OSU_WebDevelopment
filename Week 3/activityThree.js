/**
 * Takes two values and compares they are the same
 * @param {value} a 
 * @param {value} b 
 */
function deepEqual(a, b) {
	// Match in type and value
	if (a === b) {
		return true;
	}
	// Check if they are objects
	if ((typeof a == "object" && a != null) && (typeof b == "object" && b != null)) {
		// Check property lengths match
		if (Object.keys(a).length !== Object.keys(b).length) {
			return false;
		}
		for (let prop in a) {
			for (let _prop in b) {
				if (prop !== _prop) {
					return false;
				} else {
					return deepEqual(a[prop], b[_prop]);
				}
			}
		}
	} else {
		if (a !== b) {
			return false;
		}
	}
}

// test data
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {here: {is: "an", hi: 3}, object: 2}));
// → false
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, null));
// → false
console.log(deepEqual(obj, 4));
// → false