
const userDefault = function () {
    const city = 'Tacloban';
    const country = 'Philippines';
    const tempUnit = 'c';
    const precipUnit = 'mm';

    return {city, country, tempUnit, precipUnit};
}

const setInitial = function () {
    if (!localStorage.weatherAppSettings) {
        const initialDefault = JSON.stringify(userDefault());
        localStorage.setItem('weatherAppSettings', initialDefault);
    } 
}

export {setInitial}