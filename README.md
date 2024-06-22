
# Weather App

This web application fetches and displays weather information using the OpenWeatherMap API. It provides current weather details, forecasts, and other related information for a specified city.

## Demo

View the live demo of the Weather App [here](https://bharath2228.github.io/Weather-App-Project/).

## Features

- **Current Weather:** Displays current temperature, weather description, feels-like temperature, min/max temperatures, humidity, pressure, wind speed, and visibility.
- **Hourly Forecast:** Shows hourly weather details for the current day.
- **Daily Forecast:** Provides a multi-day forecast with minimum and maximum temperatures.
- **Sunrise and Sunset:** Displays sunrise and sunset times for the city.
- **Responsive Design:** Designed to be usable and responsive across different devices.
- **Dynamic Background Images:** Background images change based on the current weather conditions (feature commented out in the code).

## Technologies Used

- **HTML:** Structure and content of the weather app interface.
- **CSS:** Styling for a visually appealing user experience.
- **JavaScript:** Logic for fetching data from the API, updating UI elements, and handling user interactions.
- **OpenWeatherMap API:** Provides weather data including current weather and forecasts.
<!-- - **Unsplash API:** Fetches background images based on weather conditions (commented out in the code). -->

## How to Use

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd weather-app
   ```

3. **Open `index.html` in your browser:**
   - Simply double-click on `index.html` or open it using your preferred web browser.

4. **Usage:**
   - Enter the name of a city in the search bar and press Enter or click the search button.
   - The app will display the current weather details and forecast for the specified city.

5. **Keyboard Support:**
   - Enter key (`Enter`) can be used to trigger the search functionality for convenience.


## Implementation Details

- **Data Handling:** Utilizes JavaScript to fetch and process JSON data from OpenWeatherMap API endpoints.
- **UI Updates:** Dynamically updates the DOM based on fetched data to provide a seamless user experience.
- **Date and Time:** Includes functions to convert Unix timestamps to readable dates and times, including sunrise and sunset times.

## Future Enhancements

- **Extended Forecast:** Enhance the app to display a longer-term weather forecast.
- **User Preferences:** Allow users to set preferences for temperature units (e.g., Celsius or Fahrenheit) and display options.
- **Interactive Features:** Implement interactive features such as user-selected cities, favorite locations, or weather alerts.

