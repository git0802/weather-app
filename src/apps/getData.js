const baseURL = 'https://api.weatherapi.com/v1';
const apiKey = `39350a4b141049a684c174535232410`;
// const location = 'tacloban';

const getDataFromAPI = async function (location) {
    const forecastRequestURL = `${baseURL}/forecast.json?key=${apiKey}&q=${location}&days=3`;

    let forecastObj;
    try {
        const forecastResponse = await fetch(forecastRequestURL, {
            method: "GET",
            mode: "cors",
        });

        const parsedData = await forecastResponse.json();

        forecastObj = parsedData;

    } catch(err) {
        forecastObj = 'error';
    }
    
    return forecastObj;
}


export {getDataFromAPI};