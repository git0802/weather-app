import { format } from "date-fns";
import { getForecastData } from "./memoryHandler";
import { getDayForecast } from "./forecastScripts";
import { getUserSettings, getUserPref} from "./userSettings";

// Reusable Shorter DOM selector
const domElem  = function (selector) {
    return document.querySelector(selector);
}

// Reusable span creator
const createSpan = function (parent, assignClass, textContent) {
    const span = document.createElement('span');
    span.setAttribute('class', assignClass);
    span.textContent = textContent;

    parent.appendChild(span);
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

    createHourlyForecast(forecastData);
}

const createHourlyForecast = function (data) {
    // data argument should receive the whole response,
    // this function is responsible with finding the hourly forecast
    const currentTime = Number(format(new Date(), 'h'));
    const currentHourlyData = data.forecast.forecastday[0].hour;
    const tomHourlyData = data.forecast.forecastday[1].hour;
    const hourlyObjArr = [];

    // Pushes hourly forecast to hourlyObjArr from next hour of current hour until end of current day
    for (let i =( currentTime + 1 ); i < currentHourlyData.length; i++) {
        hourlyObjArr.push(currentHourlyData[i]);
    }

     // Pushes hourly forecast to hourlyObjArr from start of next day until same hour of current hour
     for (let i = 0; i <= currentTime; i++) {
        hourlyObjArr.push(tomHourlyData[i]);
    }

    console.log(hourlyObjArr);

    // Creates and return individual hourly forecast
    const createHourlyDisplay = function (hourlyObj) {
        // hourlyObj parameter receives individual hourly forecast object 
        const dateObj = new Date(hourlyObj.time_epoch * 1000);
        const hourString = format(dateObj, 'HH:ss'); // time in string 00:00 format
        const condition = hourlyObj.condition.text; // condition description string
        const cdnIcon = hourlyObj.condition.icon; // src url
        const tempUnit = getUserPref('tempUnit');
        const tempVal = Math.round(hourlyObj[`temp_${tempUnit}`]);

        const hourlyCont = document.createElement('div');
        hourlyCont.setAttribute('class', 'hourly-forecast');

        const time = document.createElement('p');
        time.setAttribute('class', 'hourly-time');
        time.textContent = hourString;

        const weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('class', 'hourly-weather-icon');
        weatherIcon.setAttribute('alt', `${hourString} ${condition}`);
        weatherIcon.setAttribute('src', `${cdnIcon}`);
        weatherIcon.setAttribute('title', `${condition}`);

        const temp = document.createElement('p');
        temp.setAttribute('class', 'hourly-temp');

        createSpan(temp, 'hourly-num', `${tempVal}`);
        createSpan(temp, 'hourly-degree', '\u00B0');
        createSpan(temp, 'hourly-unit', `${tempUnit.toUpperCase()}`);

        const components = [time, weatherIcon, temp];
        components.forEach(comp => hourlyCont.appendChild(comp));

        return hourlyCont;
    }

    // Executes createHourlyDisplay using object form array hourlyObjArr
    // then append to existing forecast container in DOM
    const allForecastCont = domElem('div#hourly-forecast-cont');
    hourlyObjArr.forEach(obj => {
        const hourlyForecast = createHourlyDisplay(obj);
        allForecastCont.appendChild(hourlyForecast);
    });
}



export {displayMainData}