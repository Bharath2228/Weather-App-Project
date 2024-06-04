// weather App project

let weather = {
    "apiKey": "115adba2aef0c1b5bbc0d548d6543bee",

    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="
                + city 
                + "&units=metric&appid="
                + this.apiKey)
        .then((response) => response.json())
        .then((data) => {
            this.displayCityDetails(data);
            this.displayWeather(data);
        })
    },

    displayCityDetails: function(data) {

        const { name, sunrise, sunset, country} = data.city;
        document.querySelector('.city').innerText = "City: " + name;
        document.querySelector('.sunrise').innerText = `Sunrise 🌄: ${convertUnixTime(sunrise)}`
        document.querySelector('.sunset').innerText = `Sunset 🌇: ${convertUnixTime(sunset)}`
        document.querySelector('.country').innerText = `Counrty: ${country}`
        document.querySelector('.date').innerText = getTodaysDate()
        setInterval(updateClock, 1000)
        document.body.style.background = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundSize = "cover"
    },

    displayWeather: function(data){

        console.log(data)
        // const { icon, description } = data.weather[0]
        // const { temp, humidity } = data.main;
        // const { speed } = data.wind        

        // document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        // document.querySelector(".description").innerText = description;
        // document.querySelector(".temp").innerText = temp + " °C"
        // document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%"
        // document.querySelector(".wind").innerText = "Wind Speed: " + speed +" km/h"
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};


function getTodaysDate(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date()

    const day = now.getDay();
    const date = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    return (`${(date).toString().padStart(2, 0)}-${months[month]}-${year}`)
}

function convertUnixTime(timefromAPI){

    const date = new Date(timefromAPI * 1000)
    hour = date.getHours()
    min = date.getMinutes()

    const meridiem = hour >= 12 ? "PM" : "AM"

    if (hour > 12){
        timeFormat = `${(hour % 10) - 2}:${min} ${meridiem}`
    } else 
    if(hour == 12){
        timeFormat = `${hour}:${min} PM`
    }
    else if(hour == 0){
        timeFormat = `${12}:${min} AM`
    }
    else{
        timeFormat = `${hour}:${min} ${meridiem}`
    }
    return timeFormat;
}

function updateClock(){
    const now = new Date()
    let hours = now.getHours()
    const meridiem = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12
    hours = hours.toString().padStart(2, 0);

    const mins = now.getMinutes().toString().padStart(2, 0)
    const seconds = now.getSeconds().toString().padStart(2, 0)
    const timeString = `${hours}:${mins}:${seconds} ${meridiem}`

    document.querySelector('.timebox .liveTime').innerHTML = timeString
}

document.querySelector(".search-button").addEventListener('click', () => {
    weather.search()
})

document.querySelector(".search-bar").addEventListener('keyup', event => {
    if(event.key == "Enter"){
        weather.search()
    }
})

weather.fetchWeather("Bengaluru");