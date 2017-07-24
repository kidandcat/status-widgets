const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const tcpp = require('tcp-ping');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let URLS;
let ALERTS = [];
let LATEST_DATA = {};

let config;
try{
  config = require(__dirname + '/config.json');
}catch(e){
  console.log('Configuration file not found.');
}

//All times in seconds
const TIME_BETWEEN_ALERTS = config.timeBetweenAlerts || 300;
const TIME_BETWEEN_PINGS = config.timeBetweenPings || 5;
const PORT = config.port || 80;

//Socket.io
io.on('connection', function(socket) {
  URLS.forEach((u) => {
    try{
      socket.emit('update', {
        url: u.url,
        name: u.name,
        time: LATEST_DATA[u.url]
      });
    }catch(e){}
  });
});

//Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', express.static('public'));
app.post('/add/url', function(req, res) {
  saveUrl(req.body.url, req.body.name);
  res.json({
    'message': 'Done'
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});

//Check website up
loadUrls();
URLS.forEach((u) => {
  check(u, true);
});

//Activate the alerts after a while
setTimeout(()=>{
  console.log('Alerts enabled.');
  alert = alertf;
},15000);

//Functions
function check(url, repeat) {
  request.get(url.url, function(error, response, body) {
    if (response.statusCode == 200) {
      tcpp.ping({
        address: url.url.split('//')[1]
      }, function(err, data) {
        if (err) {
          alert(available, err, url.url);
        }
        LATEST_DATA[url.url] = Math.round(data.avg);
        io.emit('update', {
          url: url.url,
          name: url.name,
          time: Math.round(data.avg)
        });
      });
    } else {
      alert(response.statusCode, error, url.url);
      io.emit('update', {
        url: url.url,
        name: url.name,
        time: 0
      });
    }
    if (repeat) {
      setTimeout(() => {
        check(url, true);
      }, TIME_BETWEEN_PINGS * 1000);
    }
  });
}

function alert(){

}

let alertf = function(code, error, url) {
  //JSON.stringify(obj1) === JSON.stringify(obj2)
  let show = true;
  let b = JSON.stringify({
    code: code,
    error: error,
    url: url
  });
  ALERTS.forEach((a) => {
    if (a.data == b) {
      let now = new Date();
      if (Math.round(((now - a.time) / 1000)) > TIME_BETWEEN_ALERTS) {
        delete ALERTS[ALERTS.indexOf(a)];
      } else {
        show = false;
      }
    }
  });
  if (show) {
    request.post(
      'https://hooks.slack.com/services/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', {
        json: {
          username: 'Indigitall Status',
          text: 'URL <' + url + '> is not respoding!!\n Status Code: ' + code + '\n' +
            'Error: ' + JSON.stringify(error, null, 2)
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body)
        }
      }
    );
    ALERTS.push({
      data: JSON.stringify({
        code: code,
        error: error,
        url: url
      }),
      time: new Date()
    });
  }
}

function loadUrls() {
  URLS = require(__dirname + '/urls.json').urls;
}

function saveUrl(url, name) {
  URLS.push({
    url: url,
    name: name
  });
  fs.writeFileSync(__dirname + '/urls.json', JSON.stringify({
    urls: URLS
  }, null, 2));
  check(url, true);
  loadUrls();
}
