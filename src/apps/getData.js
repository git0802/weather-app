require("dotenv").config();
// const location = 'tacloban';

const getDataFromAPI = async function (location) {
    const forecastRequestURL = `${process.env.BASE_URL}/forecast.json?key=${process.env.API_KEY}&q=${location}&days=3`;

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