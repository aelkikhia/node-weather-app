
const request = require('request');

var getWeather = (lat, lng, callback) => {

  const apikey = '06dc34e861ac1e91139f2ac35bc79e04'
  request({
    url: `https://api.forecast.io/forecast/${apikey}/${lat},${lng}`,
    // apikey: 'f054acf81ece8900030ee99ee1d86735',
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to weather services.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch the weather.');
    } else if (response.statusCode === 200) {

      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unknown error.');
    }
  });
};

module.exports.getWeather = getWeather;
