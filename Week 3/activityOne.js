
// Demonstrate function hoisting

console.log("This works: ", double(5));

function double(x) {
	return 2 * x;
}

console.log("This works, too: ", double(10));

// Demonstrate how hoisting does not occur when assigned to a variable

console.log("This should not work:", doubling(3)); //throws error that doubling is not defined

const doubling = function(x) {
	return 2 * x;
}