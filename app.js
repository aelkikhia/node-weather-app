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

geocode.geocodeAddress(argv.address, (errorMesage, geocodeResults) => {
  if (errorMesage) {
    console.log(errorMesage);
  } else {
    console.log(geocodeResults.address);
    weather.getWeather(geocodeResults.lat, geocodeResults.lng, (errorMesage, weatherResults) => {
      if (errorMesage) {
        console.log(errorMesage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
