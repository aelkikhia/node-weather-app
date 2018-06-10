const axios = require('axios');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  const apikey = '06dc34e861ac1e91139f2ac35bc79e04';
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  console.log(response.data.results[0].formatted_address);
  var weatherUrl = `https://api.forecast.io/forecast/${apikey}/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temp}, but it feels like ${apparentTemp}`);
}).catch((e) => {
  if(e.code === 'ECONNREFUSED') {
    console.log('error', 'Connection refused');
  } else if (e.code === 'ENOTFOUND') {
    console.log('error', 'not found');
  } else {
    console.log(e.message);
  }
});
