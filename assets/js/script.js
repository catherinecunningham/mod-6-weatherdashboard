// GLOBAL VARIABLES
var currentCity = document.getElementById("current-city")
var searchBtn = document.getElementById("search-btn")

var degree = "°F"
var mph = " mph"
var percent = "%"

var day = document.getElementById("day-0")
var temp = document.getElementById("temp-input")
var wind = document.getElementById("wind-input")
var humidity = document.getElementById("humidity-input")
var UV = document.getElementById("UV-input")
var curWeathIcon = document.querySelector('#curWeathIcon')

var day1 = document.getElementById("day-1")
var day2 = document.getElementById("day-2")
var day3 = document.getElementById("day-3")
var day4 = document.getElementById("day-4")
var day5 = document.getElementById("day-5")

var icon1 = document.querySelector('#day1WeathIcon')
var temp1 = document.getElementById("day-1-temp")
var wind1 = document.getElementById("day-1-wind")
var humidity1 = document.getElementById("day-1-humidity")

var icon2 = document.querySelector('#day2WeathIcon')
var temp2 = document.getElementById("day-2-temp")
var wind2 = document.getElementById("day-2-wind")
var humidity2 = document.getElementById("day-2-humidity")

var icon3 = document.querySelector('#day3WeathIcon')
var temp3 = document.getElementById("day-3-temp")
var wind3 = document.getElementById("day-3-wind")
var humidity3 = document.getElementById("day-3-humidity")

var icon4 = document.querySelector('#day4WeathIcon')
var temp4 = document.getElementById("day-4-temp")
var wind4 = document.getElementById("day-4-wind")
var humidity4 = document.getElementById("day-4-humidity")

var icon5 = document.querySelector('#day5WeathIcon')
var temp5 = document.getElementById("day-5-temp")
var wind5 = document.getElementById("day-5-wind")
var humidity5 = document.getElementById("day-5-humidity")

//UV Index Color Functions
function LowUV() {
    UV.style.backgroundColor = "#00FF00"
}
function ModerateUV() {
    UV.style.backgroundColor = "#FFFF00"
}
function HighUV() {
    UV.style.backgroundColor = "#FFA500"
}
function VeryHighUV() {
    UV.style.backgroundColor = "#FF0000"
}

// search button function
searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    var exclusions = "minutely, hourly, daily, alerts"
    var cityInput = document.getElementById("city-input")
    var ul = document.getElementById("ul")

    // prevent search history from repeating searched cities in multiple buttons
    var searched = false
    var historyBtns = document.querySelectorAll(".history-btn")
    if (historyBtns) {
        for (let i = 0; i < historyBtns.length; i++) {
            if (historyBtns[i].textContent == cityInput.value) {
                searched = true
            }
        }
    }
    if (!searched) {
        var btn = document.createElement("button")
        btn.classList.add("history-btn")
        var li = document.createElement("li")
        btn.textContent = cityInput.value
        ul.appendChild(li)
        li.appendChild(btn)
        btn.addEventListener('click', function (e) {
            e.preventDefault()
            cityInput.value = this.textContent
        })
    }

    // first API call
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=b265093aa7a118e11c4591d956102e2c&units=imperial")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            day.textContent = data.name + ' (' + moment().format('l') + ') '

            //Current weather and forecast icons
            curWeathIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

            icon1.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            icon2.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            icon3.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            icon4.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            icon5.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

            //temp, wind, humidity, city name for chosen city
            temp.textContent = "Temp: " + data.main.temp + degree
            wind.textContent = "Wind Speed: " + data.wind.speed + mph
            humidity.textContent = "Humidity: " + data.main.humidity + percent

            // second API call
            fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=" + exclusions + "&appid=b265093aa7a118e11c4591d956102e2c")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)

                    //UV index for chosen city
                    UV.textContent = "UV Index: " + data.value
                    UV.value = data.value

                    //Assign color to UV index value
                    if (UV.value <= 2) {
                        console.log("UV", UV)
                        console.log("low", UV.value)
                        LowUV()
                    } else if (UV.value >= 3 && UV.value <= 5) {
                        console.log("mod", UV.value)
                        ModerateUV()
                    } else if (UV.value >= 6 && UV.value <= 7) {
                        console.log("high", UV.value)
                        HighUV()
                    } else {
                        console.log("very high", UV.value)
                        VeryHighUV()
                    }
                })

            //5-day forecast (temp, wind, humidity), dates (3rd API call)
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=" + exclusions + "&appid=b265093aa7a118e11c4591d956102e2c&units=imperial")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    //5-days needed in array: 3, 11, 19, 27, 35
                    day1.textContent = moment().add("days", 1).format('l')
                    temp1.textContent = "Temp: " + data.list[3].main.temp_max + degree
                    wind1.textContent = "Wind Speed: " + data.list[3].wind.speed + mph
                    humidity1.textContent = "Humidity: " + data.list[3].main.humidity + percent

                    day2.textContent = moment().add("days", 2).format('l')
                    temp2.textContent = "Temp: " + data.list[11].main.temp_max + degree
                    wind2.textContent = "Wind Speed: " + data.list[11].wind.speed + mph
                    humidity2.textContent = "Humidity: " + data.list[11].main.humidity + percent

                    day3.textContent = moment().add("days", 3).format('l')
                    temp3.textContent = "Temp: " + data.list[19].main.temp_max + degree
                    wind3.textContent = "Wind Speed: " + data.list[19].wind.speed + mph
                    humidity3.textContent = "Humidity: " + data.list[19].main.humidity + percent

                    day4.textContent = moment().add("days", 4).format('l')
                    temp4.textContent = "Temp: " + data.list[27].main.temp_max + degree
                    wind4.textContent = "Wind Speed: " + data.list[27].wind.speed + mph
                    humidity4.textContent = "Humidity: " + data.list[27].main.humidity + percent

                    day5.textContent = moment().add("days", 5).format('l')
                    temp5.textContent = "Temp: " + data.list[35].main.temp_max + degree
                    wind5.textContent = "Wind Speed: " + data.list[35].wind.speed + mph
                    humidity5.textContent = "Humidity: " + data.list[35].main.humidity + percent
                })
        })

})

