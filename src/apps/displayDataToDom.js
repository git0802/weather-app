import { format } from "date-fns";
import { getForecastData } from "./memoryHandler";
import { getDayForecast } from "./forecastScripts";


const displayData = function () {
    const forecastData = getForecastData();
    const userSettings = JSON.parse(localStorage.weatherAppSettings);
    const {tempUnit, precipUnit} = userSettings;

    console.log(forecastData);

    // DOM elements
    const cityName = document.querySelector('p#city');
    const countryName = document.querySelector('p#country');
    const mainDate = document.querySelector('p#date');
    const mainTempHero = document.querySelector('p#main-temp');
    const tempUnits = document.querySelectorAll('span.units');
    const mainTempHigh = document.querySelector('p#main-high-temp span.temp');
    const mainTempLow = document.querySelector('p#main-low-temp span.temp');
    const precipStat = document.querySelector('div#stat-precip p.stat-num');
    const precipStatUnit = document.querySelector('div#stat-precip p.stat-unit');

    // Value
    const locationName = forecastData.location.name;
    const locationCountry = forecastData.location.country;
    const todayDate = format(new Date(), 'eee, MMMM d, yyyy ');
    const mainTempHeroVal = forecastData.current[`temp_${tempUnit}`];
    const mainTempHighVal = getDayForecast(forecastData, 0, 'day')[`maxtemp_${tempUnit}`];
    const mainTempLowVal = getDayForecast(forecastData, 0, 'day')[`mintemp_${tempUnit}`];
    const precipVal = forecastData.current[`precip_${precipUnit}`];
    console.log(precipVal);

    // Assign values/text to DOM elements
    cityName.textContent = locationName;
    countryName.textContent = locationCountry;
    mainDate.textContent = todayDate;

    mainTempHero.textContent = `${Math.round(mainTempHeroVal)}`;
    mainTempHigh.textContent = `${Math.round(mainTempHighVal)}`;
    mainTempLow.textContent = `${Math.round(mainTempLowVal)}`;
    tempUnits.forEach(span => {
        const unitSpan = span;
        unitSpan.textContent = tempUnit.toUpperCase()
    });

    precipStat.textContent = precipVal;
    precipStatUnit.textContent = precipUnit;



}

export {displayData}