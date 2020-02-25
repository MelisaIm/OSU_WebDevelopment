function buildList(list) {
	let result = [];
    for (let i = 0; i < list.length; i++) {
		let item = 'item' + list[i];
		// no alert in local dev env
        result.push( function (item, list, i) {
	 		return function() {
				 console.log(item + ' ' + list[i])
				}; 
			}(item, list, i));
    }
    return result;
}
 
function testList() {
	let fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (let j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();