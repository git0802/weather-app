
const getDayForecast = function (data, day, section) {
    // Parameters:
    // data -> forecast data generated from weatherAPI, in object data type 
    // day -> 0-2, 0 = current day
    // section -> forecast section, e.g. astro, day, hour

    const forecastData = data.forecast.forecastday[day][section];

    return forecastData;
}

export { getDayForecast };