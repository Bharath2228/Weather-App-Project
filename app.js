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
            this.presentDayEntireWeatherReport(data);
        })

        fetch("https://api.openweathermap.org/data/2.5/weather?q="
                + city 
                + "&units=metric&appid="
                + this.apiKey)
        .then((response) => response.json())
        .then((data) => {
            this.displayWeather(data);
        })
    },

    displayCityDetails: function(data) {

        const { name, sunrise, sunset, country} = data.city;
        const imageDiv = document.querySelector('.card1');
        imageDiv.style.background = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
        imageDiv.style.backgroundRepeat = "no-repeat"
        imageDiv.style.backgroundSize = "cover"
        document.querySelector('.city').innerText = "City: " + name;
        document.querySelector('.sunrise').innerText = `Sunrise 🌄: ${convertUnixTime(sunrise)}`
        document.querySelector('.sunset').innerText = `Sunset 🌇: ${convertUnixTime(sunset)}`
        document.querySelector('.country').innerText = `Counrty: ${country}`
        document.querySelector('.date').innerText = getTodaysDate()
        setInterval(updateClock, 1000)
    },

    displayWeather: function(data){

        const { icon, description } = data.weather[0]
        const { temp, feels_like, temp_min, temp_max } = data.main
        document.querySelector(".description").innerText = description;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        const imageDiv = document.querySelector('.card2');
        imageDiv.style.background = "url('https://source.unsplash.com/1600x900/?"+ description +"')"
        imageDiv.style.backgroundRepeat = "no-repeat"
        imageDiv.style.backgroundSize = "cover"
        document.querySelector(".temp").innerText = temp + " °C"
        document.querySelector(".feelsLike").innerText = `Feels Like ${feels_like} °C`
        document.querySelector('.tempminmax').innerText = `${temp_min} ~ ${temp_max} °C`
   
        // document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%"
        // document.querySelector(".wind").innerText = "Wind Speed: " + speed +" km/h"
    },

    presentDayEntireWeatherReport: function(data){
        console.log(data)
        const temps = []
        const icons = []
        const time = []
        const weatherDataDiv = document.querySelector('.card4')
        const now = new Date()

        lengthofList = data.list.length

        for (let i = 0; i < lengthofList; i++){

            if(getDatefromDt(data.list[i].dt) ===  now.getDate()){
                console.log(data.list[i].main)
                temps.push(data.list[i].main.temp)
                icons.push(data.list[i].weather[0].icon)
                time.push(convertUnixTime(data.list[i].dt).toString())
                
            }
        }

        if(temps.length == time.length){
            for (let i = 0; i < temps.length; i++) {
                
                const EntryDiv = document.createElement('div')
                EntryDiv.classList.add('weatherEntry')

                const temp = document.createElement('p')
                temp.textContent = `${Math.floor(temps[i])} °C`
                EntryDiv.appendChild(temp)

                const icon = document.createElement('img')
                icon.src = "https://openweathermap.org/img/wn/" + icons[i] +".png";
                EntryDiv.appendChild(icon)

                const timeEle = document.createElement('p')
                timeEle.textContent = `${time[i]}`
                EntryDiv.appendChild(timeEle)

                weatherDataDiv.appendChild(EntryDiv)

            }
        }

        console.log(temps)
        console.log(icons)
        console.log(time)

    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

function getDatefromDt(dt){

    const date = new Date(dt * 1000)
    // console.log(date)
    NowDate = date.getDate()
    return NowDate;

}

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
    console.log(hour, min)

    timeFormat = `${hour}:${min}`
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