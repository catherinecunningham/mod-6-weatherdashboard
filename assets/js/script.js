// GLOBAL VARIABLES
var currentCity = document.getElementById("current-city")
var searchBtn = document.getElementById("search-btn")
var degree = "°F"
var temp = document.getElementById("temp-input")
var wind = document.getElementById("wind-input")
var humidity = document.getElementById("humidity-input")
var UV = document.getElementById("UV-input")
var day1 = document.getElementById("day-1")
var day2 = document.getElementById("day-2")
var day3 = document.getElementById("day-3")
var day4 = document.getElementById("day-4")
var day5 = document.getElementById("day-5")

var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-2-temp")
var humidity1 = document.getElementById("day-2-humidity")

var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-2-temp")
var humidity1 = document.getElementById("day-2-humidity")

var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-2-temp")
var humidity1 = document.getElementById("day-2-humidity")

var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-2-temp")
var humidity1 = document.getElementById("day-2-humidity")

var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-2-temp")
var humidity1 = document.getElementById("day-2-humidity")

// Weather API
searchBtn.addEventListener('click', function(e) {
    e.preventDefault()
    var exclusions = "minutely, hourly, daily, alerts"
    var cityInput = document.getElementById("city-input")
    var form = document.getElementById("form")

    var btn = document.createElement("button")
    btn.textContent = cityInput.value
    form.appendChild(btn)
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        cityInput.value = this.textContent
    })

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=b265093aa7a118e11c4591d956102e2c&units=imperial")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        //temp, wind, humidity, city name
        currentCity.textContent = data.name 
        temp.textContent = "Temp: " + data.main.temp + degree
        wind.textContent = "Wind Speed: " + data.wind.speed + " mph"
        humidity.textContent = "Humidity: " + data.main.humidity + "%"
       

        fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+ data.coord.lat +"&lon="+ data.coord.lon +"&exclude="+exclusions+"&appid=b265093aa7a118e11c4591d956102e2c")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        //UV index
        UV.textContent = "UV Index: " + data.value
        })
        //current date - convert from unix timestamp

        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+ data.coord.lat +"&lon="+ data.coord.lon +"&exclude="+exclusions+"&appid=b265093aa7a118e11c4591d956102e2c")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        //5-day forecast (temp, wind, humidity), dates
        //5-days needed in array: 3, 11, 19, 27, 35
        })
    })


})
    
