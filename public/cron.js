var fs = require('fs');
var cron = require('node-cron');
// const nodemailer = require('nodemailer');
var request = require('request');

var key = '80702c741cc544db0b5af8a4038c4e97';
var latitude = 51;
var longitude = 0;

// function sendEmail(newValue) {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'boltonaldev@gmail.com',
//             pass: 'ye8YxJ4we@u2q6NnXp85'
//         }
//     });
//
//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"YourServer 👻" <boltonaldev@gmail.com>', // sender address
//         to: '👻 👻 👻 👻, boltonalex@gmail.com', // list of receivers
//         subject: 'Weather update has succeeded ✔', // Subject line
//         text: 'Hello, the weather is ' + newValue, // plain text body
//         html: '<b>Hello, the weather is </b>' + newValue // html body
//     };
//
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }

let runTime = '0 5 * * *';

console.log('cron started, waiting to run... runTime: ' + runTime);

var task = cron.schedule(runTime, function() {
    console.log('cron running');
    var time = Math.floor(new Date() / 1000);
    var APICall = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + ',' + time + '?units=si&exclude=minutely,hourly,daily,alerts,flags';
    request(APICall, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            var newTime = info.currently.time;
            var newValue = info.currently.temperature;
            fs.readFile('Data/Weather.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    obj.temperatures.push({time: newTime, value: newValue});
                    json = JSON.stringify(obj, null, ' ');
                    fs.writeFile('Data/Weather.json', json, 'utf8');
                    console.log('cron run success');
                    // sendEmail(newValue);
                }
            });
        } else {
            console.log(response.statusCode);
        }
    })
});

task.start();
