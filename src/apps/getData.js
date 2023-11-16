const baseURL = 'https://api.weatherapi.com/v1';
const apiKey = `39350a4b141049a684c174535232410`;

const getDataFromAPI = async function () {
    const requestURL = `${baseURL}/current.json?key=${apiKey}&q=tacloban`;

    const response= await fetch(requestURL, {
        method: "GET",
        mode: "cors",
    });

    const responseJson = await response.json()

    console.log(responseJson);
}

export {getDataFromAPI}