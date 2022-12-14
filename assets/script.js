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


function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }