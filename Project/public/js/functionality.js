let navItem = window.location.pathname;
console.log(navItem);

// on load add select buttons
const trackerForm = document.getElementById("tracker-form");
for (let i = 1; i <= 31; i++) {
	let select = document.getElementById("days");
	let option = document.createElement("option");
	select.options.add(option);
	option.text = i;
	option.value = i;
}

document.getElementById("tracker-form").addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(e);
	const days = e.target[0].value;
	const label = e.target[1].value;
	let iframe = document.getElementById("generatedTracker");
	let cssLink = document.createElement("link");
	cssLink.href = "/public/css/iframe.css";
	cssLink.rel = "stylesheet";
	cssLink.type = "text/css";

	let boxes = '';
	let dayLabels = '';
	for (let i = 1; i <= days; i++) {
		boxes += "<td class='tickbox'>&#9634;</td>";
		dayLabels += `<td class='numLabel'>${i.toString()}</td>`;
	}
	iframe.contentWindow.document.head.appendChild(cssLink);
	iframe.contentWindow.document.body.innerHTML = `<h1>Let's track it</h1> <div>${label}: <table><tr>${dayLabels}</tr><tr>${boxes}</tr></table>`;
});