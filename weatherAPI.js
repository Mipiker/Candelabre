const axios = require('axios');

const city = "Pornic";
const apiKey = "c21a75b667d6f7abb81f118dcf8d4611";
const units = "metric";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${apiKey}&units=${units}`;

function weatherRequest() {
    return axios.get(url)
    .then(response => {
        console.log(`Wind speed: ${response.data.wind.speed} m/s`);
        return response.data.wind.speed;
    })
    .catch(error => {
        console.error(`Error with weather API request: ${error.message}`);
    }); 
}

module.exports = {
    weatherRequest:weatherRequest
}
