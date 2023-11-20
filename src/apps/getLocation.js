import { getDataFromAPI } from "./getData";
import { setForecastData, getForecastData } from "./memoryHandler";
import { displayData } from "./displayDataToDom";

const locationBar = document.querySelector('input#city-search-field');
const searchBtn = document.querySelector('button#city-search-button');

const getLocationWeather = async function () {
    const locationVal = locationBar.value;
    
    const forecastData = await getDataFromAPI(locationVal);
    
    if (forecastData !== 'error') {
        // After getting data from API, save data to memoryHandler
        setForecastData(forecastData);

        // Displays data to DOM upon clicking search button
        displayData();
    }

}


// Add event listener to search button on page load
const assignSearchBtnEvent = function () {
    searchBtn.addEventListener('click', getLocationWeather)
}

export {assignSearchBtnEvent}