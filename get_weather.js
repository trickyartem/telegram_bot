const axios = require('axios');

module.exports = (function() {
    const fahrenheit_to_celsius = number => ((number - 32) * 5 / 9);

    return {
        echo(...args) {
            console.log("Your args -> ", args);
        },

        async fetch(city_name) {
            const city = cities[city_name];
            if (city === undefined) {
                return 'This city is not aviable';
            }
            const { lat, lon } = city;
            const api_url = `https://api.darksky.net/forecast/${process.env.WHETHER_KEY}/${lat},${lon}`;
            const whether_response = await axios.get(api_url);

            const cur = whether_response.data.currently;
            const daily = whether_response.data.daily.data[7];

            // current whether

            const summary = cur.summary;
            const temp = fahrenheit_to_celsius(cur.temperature).toFixed(2);
            const current_whether = `Current whether in ${whether_response.data.timezone} is ${summary}, and temperature is ${temp} °C and`;


            // daily whether

            const temp_daily = fahrenheit_to_celsius((daily.temperatureHigh + daily.temperatureLow) / 2).toFixed(2);
            const summary_daily = daily.summary;

            return `${current_whether} for the rest of this day you should expect this temperature ${temp_daily} °C and ${summary_daily}`;
        }
    }
})();