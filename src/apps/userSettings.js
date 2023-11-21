
const userDefault = function () {
    const city = 'Manila';
    const country = 'Philippines';
    const tempUnit = 'c';
    const precipUnit = 'mm';
    const windUnit = 'kph';

    return {city, country, tempUnit, precipUnit, windUnit};
}

const setInitial = function () {
    if (!localStorage.weatherAppSettings) {
        const initialDefault = JSON.stringify(userDefault());
        localStorage.setItem('weatherAppSettings', initialDefault);
    } 
}

const getUserSettings = function () {
    return JSON.parse(localStorage.weatherAppSettings);
}

const getUserPref = function (property) {
    const userSettings = JSON.parse(localStorage.weatherAppSettings);
    return userSettings[property];
}

export {setInitial, getUserSettings, getUserPref}