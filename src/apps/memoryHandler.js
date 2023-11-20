let forecastData;

const setForecastData = function (data) {
    forecastData = data;   
}

const getForecastData = function () {
    return forecastData;
}


export {setForecastData, getForecastData};