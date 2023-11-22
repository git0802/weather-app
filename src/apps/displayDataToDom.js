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

// Reusable weather condition icon maker 
const createCdnIcon = function ( assignClass, time, condition, iconUrl ) {
    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('class', assignClass);
    weatherIcon.setAttribute('alt', `${time} ${condition}`);
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('title', condition);

    return weatherIcon;
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
    const condition = domElem('p#main-condition');
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
    const conditionVal = forecastData.current.condition.text;
    const mainTempHighVal = getDayForecast(forecastData, 0, 'day')[`maxtemp_${tempUnit}`];
    const mainTempLowVal = getDayForecast(forecastData, 0, 'day')[`mintemp_${tempUnit}`];
    const precipVal = forecastData.current[`precip_${precipUnit}`];
    const humidVal = forecastData.current.humidity;
    const windVal = forecastData.current[`wind_${windUnit}`];
    const windDir = forecastData.current.wind_dir;
    
    // Assign values/text to DOM elements
    cityName.textContent = locationName;
    countryName.textContent = locationCountry;
    mainDate.textContent = todayDate;

    mainTempHero.textContent = `${Math.round(mainTempHeroVal)}`;

    condition.textContent = conditionVal;

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

const displayHourlyForecast = function (data) {
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

        const weatherIcon = createCdnIcon('hourly-weather-icon', hourString, condition, cdnIcon);

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

const displayDailyForecast = function (data) {
    const dailyObjArr = [];
    for(let i = 1; i <= 2; i++) {
        // Note: free tier weatherAPI only allows forecast upto 3 days
        // [0] -> current day, [1] -> tomorrow, [2] -> 3rd day
        // Push the next 2 days forecast obj to dailyObjArr
        dailyObjArr.push(data.forecast.forecastday[i]);
    }
    
    const createDailyDisplay = function (dailyObj) {
        console.log(dailyObj);
        const dateObj = new Date(dailyObj.date_epoch * 1000);
        const dateString = format(dateObj, 'MM/dd');
        const dateStringFull = format(dateObj, 'MMMM d, yyyy');
        const weekDay = format(dateObj, 'EEEE');
        const condition = dailyObj.day.condition.text;
        const cdnIcon = dailyObj.day.condition.icon; // src url
        const tempUnit = getUserPref('tempUnit');
        const maxTempVal = Math.round(dailyObj.day[`maxtemp_${tempUnit}`]);
        const minTempVal = Math.round(dailyObj.day[`mintemp_${tempUnit}`]);
        console.log(weekDay);

        const dailyDisplay = document.createElement('div');
        dailyDisplay.setAttribute('class', 'daily-forecast');

        const date = document.createElement('p');
        date.setAttribute('class', 'daily-date');
        date.textContent = dateString;

        const day = document.createElement('p');
        day.setAttribute('class', 'daily-day');
        day.textContent = weekDay;

        const weatherIcon = createCdnIcon('daily-weather-icon', dateStringFull, condition, cdnIcon);

        // reusable daily daily high/low temp creator
        const createHighLow = function (assignClass, tempMaxMin) {
            const pElem = document.createElement('p');
            pElem.setAttribute('class', assignClass);

            createSpan(pElem, 'daily-num', tempMaxMin);
            createSpan(pElem, 'daily-degree', `\u00B0`);
            createSpan(pElem, 'daily-unit', `${tempUnit.toUpperCase()}`);

            return pElem;
        }

        // Executes createHighLow
        const dailyHigh = createHighLow('daily-high', maxTempVal);
        const dailyLow = createHighLow('daily-low', minTempVal);

        // Appends component to individual day forecast, 
        // then return container
        const components = [date, day, weatherIcon, dailyHigh, dailyLow];
        components.forEach(comp => dailyDisplay.appendChild(comp));
        return dailyDisplay;
    }

    // Append daily forecast to existing daily forecast container in DOM
    const dailyForecastCont = domElem('div#daily-forecast-cont');
    dailyObjArr.forEach(obj => {
        const dailyDisplay = createDailyDisplay(obj);
        dailyForecastCont.appendChild(dailyDisplay);
    });
}

// Refreshes DOM before appending new Forecast
const refreshDisplay = function (data) {

    // Hourly forecast
    const hourlyCont = domElem('div#hourly-forecast-cont');
    const hourlyNodeList = document.querySelectorAll('div.hourly-forecast');
    hourlyNodeList.forEach(node => hourlyCont.removeChild(node));

    // Daily Forecast
    const dailyCont = domElem('div#daily-forecast-cont');
    const dailyNodeList = document.querySelectorAll('div.daily-forecast');
    dailyNodeList.forEach(node => dailyCont.removeChild(node));

}


// Consolidated function call
const displayDataToDOM = function (data) {

    // Note: refresh display first before creating new data display
    refreshDisplay();

    displayMainData(data);
    displayHourlyForecast(data);
    displayDailyForecast(data);
}



export {displayMainData, displayHourlyForecast, displayDataToDOM}