function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1000);



// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
let submitbtn = document.getElementById("Enter")
const kelvin = 273;

function getWeatherData(event){
	event.preventDefault()
	const api = '14b780f136771b55290b6cacd639b311';
	console.log(document.getElementById("cityName").value)
	let city_name = document.getElementById("cityName").value

	// API URL
	const base =
`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api}`
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

	// Calling the API
	fetch(base)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
		console.log(data);
		let temp = data.main.temp;
		let humidity = data.main.humidity;
		let windspeed = data.wind.speed;

		document.getElementById("singledaydata").innerHTML = "";

		let temperature_paragraph = document.createElement("p")
		temperature_paragraph.innerHTML = `Temperature is ; ${temp}`

		let humidity_paragraph = document.createElement("p")
		humidity_paragraph.innerHTML = `Humidity is ; ${humidity}`

		let wind_paragraph = document.createElement("p")
		wind_paragraph.innerHTML = `Wind speed is ; ${windspeed}`

		document.getElementById("singledaydata").append(temperature_paragraph, humidity_paragraph, wind_paragraph)

		forecastdata(city_name,api)
		// temperature.textContent =
		// 	Math.floor(data.main.temp - kelvin) + "°C";
		// summary.textContent = data.weather[0].description;
		// loc.textContent = data.name + "," + data.sys.country;
		// let icon1 = data.weather[0].icon;
		// icon.innerHTML =
		// 	`<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;
		 });
}
	// API ID

	function forecastdata(city_name,api_key){
		let apikey = api_key;
		let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${apikey}`
		fetch(url).then((response) => {
			return response.json();
			}).then(function(data){
				console.log(data)
			}

			)

	}
	

submitbtn.addEventListener("click",getWeatherData)