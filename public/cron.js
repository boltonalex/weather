var fs = require('fs');
var request = require('request');

var key = '80702c741cc544db0b5af8a4038c4e97';
var latitude = 51;
var longitude = 0;
var _fileLocation = '/home/boltonalex/public_html/weather/Data/Weather.json';
// var _fileLocation = './Data/Weather.json'; //dev location for file

var time = Math.floor(new Date() / 1000);
var APICall = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + ',' + time + '?units=si&exclude=minutely,hourly,daily,alerts,flags';
request(APICall, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        var newTime = info.currently.time;
        var newValue = info.currently.temperature;
        fs.readFile(_fileLocation, 'utf8', function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
                obj = JSON.parse(data);
                obj.temperatures.push({time: newTime, value: newValue});
                json = JSON.stringify(obj, null, ' ');
                fs.writeFile(_fileLocation, json, 'utf8');
                console.log('success...exiting');
            }
        });
    }
});
