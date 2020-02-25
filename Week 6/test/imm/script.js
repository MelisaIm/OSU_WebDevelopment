document.addEventListener('DOMContentLoaded', bindButtons);

function KtoF(kelvins) {
	return Math.round(kelvins * (9/5) - 459.67);
}

function bindButtons(){
	// GET form
	document.getElementById('getSubmit').addEventListener('click', function(event){
		let cityzip = document.getElementById('cityzip').value;
		let country = document.getElementById('country').value;
		let query = `${cityzip},${country}`;
		var req = new XMLHttpRequest();
		req.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=3fcd93d9fe8a21b36eaaa7854cb02220`, true);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				const response = JSON.parse(req.responseText);
				const cityName = response.name;
				const temp = KtoF(response.main.temp);
				const conditions = response.weather[0].description;
				document.getElementById('cityName').textContent = cityName;
				document.getElementById('temp').textContent = `${temp}°F`;
				document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
			} else {
				document.getElementById('cityName').textContent = `Error: ${req.statusText}. Please try again.`;
				document.getElementById('temp').textContent = "";
				document.getElementById('conditions').textContent = "";
			}});
		  req.send();
		  event.preventDefault();
	});

	// POST form
	document.getElementById('dataSubmit').addEventListener('click', function(event){
		let input = document.getElementById('data').value;
		var req = new XMLHttpRequest();
		req.open('POST', `http://httpbin.org/post`, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400){
				const response = JSON.parse(req.responseText);
				document.getElementById('postResponse').textContent = response.json;
			} else {
				document.getElementById('postResponse').textContent = `Error: ${req.statusText}. Please try again.`;
			}});
		  req.send(JSON.stringify(input));
		  event.preventDefault();
	});
  }