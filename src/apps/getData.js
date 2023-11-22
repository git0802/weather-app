const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

// const location = 'tacloban';

const getDataFromAPI = async function (location) {
  const forecastRequestURL = `${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=3`;

  let forecastObj;
  try {
    const forecastResponse = await fetch(forecastRequestURL, {
      method: "GET",
      mode: "cors",
    });

    const parsedData = await forecastResponse.json();

    forecastObj = parsedData;
  } catch (err) {
    forecastObj = "error";
  }

  return forecastObj;
};

export { getDataFromAPI };
