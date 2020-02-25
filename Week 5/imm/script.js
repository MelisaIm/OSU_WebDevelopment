document.body.setAttribute("style", "display: flex; flex-flow:column; height: 500px; width: 100%; align-items: center; justify-content: center");
// Start with this selected
let focusRow = 1;
let focusColumn = 1;

// Table 4x4
let table = document.createElement("table");
table.style.borderCollapse = "collapse";
table.style.borderSpacing = "10px";
table.style.boxSizing = "border-box";
document.body.appendChild(table);

// add 4 rows
// header row
let headerRow = document.createElement("tr");
table.appendChild(headerRow);
for (let i = 1; i < 5; i++) {
	let th = document.createElement("th");
	th.innerText = `Header ${i}`;
	headerRow.appendChild(th);
}
// 3x4 grid
for (let i = 1; i < 4; i++) {
	let row = document.createElement("tr");
	table.appendChild(row);
	for (let j = 1; j < 5; j++) {
		let cell = document.createElement("td");
		cell.innerText = `${i}, ${j}`;
		cell.setAttribute("style", "border: 0.5px solid black; text-align: center; box-sizing: border-box; padding: 5px;");
		cell.id = `${i}, ${j}`;
		cell.classList.add("cell");
		row.appendChild(cell);
	}
}

// 4 Directional Buttons
const buttonPanel = document.createElement("div");
const buttonUp = document.createElement("button");
const buttonRight = document.createElement("button");
const buttonLeft = document.createElement("button");
const buttonDown = document.createElement("button");
const markCell = document.createElement("button");
buttonUp.innerHTML = "&#8593";
buttonRight.innerHTML = "&#8594";
buttonDown.innerHTML = "&#8595";
buttonLeft.innerHTML = "&#8592";
markCell.innerText = "MARK CELL";
// Style elements
buttonPanel.setAttribute("style", "width: 130px; border: 1px solid black; text-align:center; padding: 20px 10px; margin-top: 5px");
buttonUp.setAttribute("style", "width: 30px; height:30px; border-radius: 5px;");
buttonRight.setAttribute("style", "width: 30px; height:30px; border-radius: 5px");
buttonDown.setAttribute("style", "width: 30px; height:30px; border-radius: 5px");
buttonLeft.setAttribute("style", "width: 30px; height:30px; border-radius: 5px");
markCell.setAttribute("style", "width: 50px; height:35px; border-radius: 5px; margin-top: 5px; background-color: black; color: white");
buttonUp.id = "up";
buttonRight.id = "right";
buttonDown.id = "down";
buttonLeft.id = "left";
markCell.id = "mark";
// Append elements
document.body.appendChild(buttonPanel);
buttonPanel.appendChild(buttonLeft);
buttonPanel.appendChild(buttonUp);
buttonPanel.appendChild(buttonDown);
buttonPanel.appendChild(buttonRight);
buttonPanel.appendChild(markCell);
// Logic for focus + marking
document.addEventListener('click', (e) => {
	switch(e.target.id) {
		case "up":
			if (focusRow > 1) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusRow--;
			}
			break;
		case "right":
			if (focusColumn < 4) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusColumn++;
			}
			break;
		case "down":
			if (focusRow < 3) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusRow++;
			}
			break;
		case "left":
			if (focusColumn > 1) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusColumn--;
			}			
			break;
		case "mark":
			document.getElementById(`${focusRow}, ${focusColumn}`).style.backgroundColor = "yellow";	
		default:
			break;	
	}
	document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "3px solid black";
});

document.addEventListener('keydown', (e) => {
	switch(e.keyCode) {
		case 38:
			if (focusRow > 1) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusRow--;
			}
			break;
		case 39:
			if (focusColumn < 4) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusColumn++;
			}
			break;
		case 40:
			if (focusRow < 3) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusRow++;
			}
			break;
		case 37:
			if (focusColumn > 1) {
				document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "1px solid black";
				focusColumn--;
			}			
			break;
		case 32:
			document.getElementById(`${focusRow}, ${focusColumn}`).style.backgroundColor = "yellow";	
		default:
			break;	
	}
	document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "3px solid black";
});

document.getElementById(`${focusRow}, ${focusColumn}`).style.border = "3px solid black";
