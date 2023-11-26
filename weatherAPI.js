const axios = require('axios');

const city = "Pornic";
const apiKey = "c21a75b667d6f7abb81f118dcf8d4611";
const units = "metric";

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${apiKey}&units=${units}`;

function weatherRequest() {
    axios.get(url)
        .then(response => {
            console.log(`Wind speed: ${response.data.wind.speed*3.6} km/h`);
        })
        .catch(error => {
            console.error(`Error with weather API request: ${error.message}`);
        });
}

module.exports = {
    weatherRequest:weatherRequest
}
