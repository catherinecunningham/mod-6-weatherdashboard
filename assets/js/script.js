// GLOBAL VARIABLES
var tempInput = document.getElementById("temp-input")
var windInput = document.getElementById("wind-input")
var humidityInput = document.getElementById("humidity-input")
var UVInput = document.getElementById("UV-input")
var currentCity = document.getElementById("current-city")
var searchBtn = document.getElementById("search-btn")

// Weather API
searchBtn.addEventListener('click', function(e) {
    e.preventDefault()
    var latitude = "38.5816"
    var longitude = "121.4944"
    var exclusions = "minutely, hourly, daily, alerts"
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude="+exclusions+"&appid=b265093aa7a118e11c4591d956102e2c")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
})
    
