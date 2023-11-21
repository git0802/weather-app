import { format } from "date-fns";
import { getForecastData } from "./memoryHandler";
import { getDayForecast } from "./forecastScripts";
import { getUserSettings} from "./userSettings";

// Reusable Shorter DOM selector
const domElem  = function (selector) {
    return document.querySelector(selector);
}

const displayMainData = function (data) {
    const forecastData = data;
    const userSettings = getUserSettings();
    const {tempUnit, precipUnit, windUnit} = userSettings;

    console.log(forecastData);

    // DOM elements
    const cityName = domElem('p#city');
    const countryName = domElem('p#country');
    const mainDate = domElem('p#date');
    const mainTempHero = domElem('p#main-temp');
    const tempUnits = document.querySelectorAll('span.units');
    const mainTempHigh = domElem('p#main-high-temp span.temp');
    const mainTempLow = domElem('p#main-low-temp span.temp');
    const precipStat = domElem('div#stat-precip p.stat-num');
    const precipStatUnit = domElem('div#stat-precip p.stat-unit');
    const humidStat = domElem('div#stat-humid p.stat-num');
    const windStat = domElem('div#stat-wind p.stat-num');
    const windStatUnit = domElem('div#stat-wind p.stat-unit');
    const windStatDir= domElem('div#stat-wind p.wind-dir');

    // Value
    const locationName = forecastData.location.name;
    const locationCountry = forecastData.location.country;
    const todayDate = format(new Date(), 'eee, MMMM d, yyyy ');
    const mainTempHeroVal = forecastData.current[`temp_${tempUnit}`];
    const mainTempHighVal = getDayForecast(forecastData, 0, 'day')[`maxtemp_${tempUnit}`];
    const mainTempLowVal = getDayForecast(forecastData, 0, 'day')[`mintemp_${tempUnit}`];
    const precipVal = forecastData.current[`precip_${precipUnit}`];
    const humidVal = forecastData.current.humidity;
    const windVal = forecastData.current[`wind_${windUnit}`];
    const windDir = forecastData.current['wind_dir'];
    
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

    humidStat.textContent = humidVal;

    windStat.textContent = windVal;
    windStatUnit.textContent = windUnit;
    windStatDir.textContent = windDir;
}

export {displayMainData}