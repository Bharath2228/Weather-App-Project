// weather App project

const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".city");
const card = document.querySelector(".card");
const apikey = "115adba2aef0c1b5bbc0d548d6543bee";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault() // to stop refreshing the form

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }else{
        displayError("Please Enter a City")
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();

}
function displayWeatherInfo(data){
    
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data

    card.textContent = ""
    card.style.display = "flex"
    
    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidity")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("WeatherEmoji")

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherID){

}

function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay)

}
