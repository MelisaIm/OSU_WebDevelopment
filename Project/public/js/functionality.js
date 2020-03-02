let domtoimage = require('dom-to-image');

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

document.getElementById("generatedTracker").contentWindow.document.body.innerHTML = "<h1>༼ノ◕ヮ◕༽ノ︵┻━┻ Let's track habits</h1>"

document.getElementById("tracker-form").addEventListener("submit", (e) => {
	e.preventDefault();
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
	iframe.contentWindow.document.body.insertAdjacentHTML('beforeend', `<div>${label}:</div> <table><tr>${dayLabels}</tr><tr>${boxes}</tr></table>`);
});

document.getElementById("downloadTemplate").addEventListener('click', () => {
	let template = document.getElementById("generatedTracker").contentWindow.document.body;
	domtoimage.toPng(template)
    .then(function (dataUrl) {
		var link = document.createElement('a');
        link.download = 'JournalleyHabitTracker.jpeg';
        link.href = dataUrl;
		link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
});