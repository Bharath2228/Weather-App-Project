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
            this.presntDayOtherWeatherDetails(data);
            this.otherDayWeatherDetails(data);
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
    },

    presentDayEntireWeatherReport: function(data){
        const temps = []
        const icons = []
        const time = []
        const weatherDataDiv = document.querySelector('.card4')
        const now = new Date()
        weatherDataDiv.innerHTML = ''
        lengthofList = data.list.length

        for (let i = 0; i < lengthofList; i++){

            if(getDatefromDt(data.list[i].dt) ===  now.getDate()){
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

    },

    presntDayOtherWeatherDetails: function(data){
        const { grnd_level, humidity, pressure, sea_level } = data.list[0].main;
        const { speed } = data.list[0].wind
        document.getElementById('humidityElement').textContent = `${humidity}%`
        document.getElementById('pressureElement').textContent = `${(pressure)} hPa`
        document.getElementById('visibilityElement').textContent = `${Math.floor((data.list[0].visibility)/1000)} KM`
        document.getElementById('windElement').textContent = `${Math.floor(speed)} m/s`
       
    },

    otherDayWeatherDetails: function(data){
        console.log(data)
        const result = [];
        const Card5 = document.querySelector('.card5')

        for(let i = 0; i < data.list.length; i++){
            const dt = getDatefromDt((data.list[i].dt))
            const temp = data.list[i].main.temp;
            const icons = data.list[i].weather[0].icon;

            let entry = result.find(item => item.dt.date === dt.date && item.dt.month === dt.month);
            if(!entry){
                entry = {dt: dt, temperatures: [], icon: []};
                result.push(entry)
            }
            entry.temperatures.push(temp);
            entry.icon.push(icons)
            console.log(entry)
        }
        
        Card5.innerHTML = ''

        result.forEach(entry => {
             const OtherdayWeather = document.createElement('div');
             OtherdayWeather.classList.add('otherWeatherEntry')
             
             const dateMontdiv = document.createElement('div');
             dateMontdiv.classList.add('dateMonthDiv')
             const DateMonthElement = document.createElement('p')
             DateMonthElement.textContent = `${entry.dt.date} / ${entry.dt.month}`;
             dateMontdiv.appendChild(DateMonthElement)
             OtherdayWeather.appendChild(dateMontdiv)
            
             const iconDiv = document.createElement('div');
             iconDiv.classList.add('icondiv')
             const icon = document.createElement('img')
             icon.src = "https://openweathermap.org/img/wn/" + entry.icon[minTemp(entry.temperatures).index] +".png";
             iconDiv.appendChild(icon)
             OtherdayWeather.appendChild(iconDiv)

             const minTempDiv = document.createElement('div');
             minTempDiv.classList.add('minTemp')
             const mintemperature = document.createElement('p')
             mintemperature.textContent = `${Math.floor(minTemp(entry.temperatures).value)}°C`
             minTempDiv.appendChild(mintemperature)
             OtherdayWeather.appendChild(minTempDiv)

             const maxTempDiv = document.createElement('div');
             maxTempDiv.classList.add('maxTemp')
             const maxtemperature = document.createElement('p')
             maxtemperature.textContent = `${Math.floor(maxTemp(entry.temperatures).value)}°C`
             maxTempDiv.appendChild(maxtemperature)
             OtherdayWeather.appendChild(maxTempDiv)

             Card5.appendChild(OtherdayWeather)
        })
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

function getDatefromDt(dt){

    const date = new Date(dt * 1000)
    const NowDate = date.getDate()
    const NowMonth = date.getMonth()
    return {date: NowDate, month: NowMonth};

}

function getTodaysDate(){

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date()

    const date = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    return (`${(date).toString().padStart(2, 0)}-${months[month]}-${year}`)
}

function convertUnixTime(timefromAPI){

    const date = new Date(timefromAPI * 1000)
    let hour = date.getHours()
    let min = date.getMinutes()

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

function hpatoKm(hpa){
    const T0 = 288.15;   // Standard temperature at sea level (K)
    const L = 0.0065;    // Temperature lapse rate (K/m)
    const P0 = 1013.25;  // Standard pressure at sea level (hPa)

    const altitude = (T0 / L) * Math.log(P0 / hpa);
    const altitudeKm = altitude / 1000;  // Convert meters to kilometers
    return altitudeKm;
}

function maxTemp(temperature) {
    let maxIndex = 0;
    let maxValue = temperature[0];
    for (let i = 1; i < temperature.length; i++) {
        if (temperature[i] > maxValue) {
            maxValue = temperature[i];
            maxIndex = i;
        }
    }
    return { value: maxValue, index: maxIndex };
}

function minTemp(temperature) {
    let minIndex = 0;
    let minValue = temperature[0];
    for (let i = 1; i < temperature.length; i++) {
        if (temperature[i] < minValue) {
            minValue = temperature[i];
            minIndex = i;
        }
    }
    return { value: minValue, index: minIndex };
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