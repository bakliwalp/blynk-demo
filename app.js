var Blynk = require('blynk-library');
const http = require('http');

var AUTH = '42688dd7960f4023859e0410f856be5c';

var blynk = new Blynk.Blynk(AUTH);

var v1 = new blynk.VirtualPin(1);
var v5 = new blynk.VirtualPin(5);
var v6 = new blynk.VirtualPin(6);
var v7 = new blynk.VirtualPin(7);

v1.on('write', function(param) {
  console.log('V1:', param[0]);
});

v5.on('read', function() {
    v5.write(new Date().getSeconds());
});

v6.on('read', function() {
    v6.write(new Date().getSeconds());
});

v7.on('read', function() {
   v7.write(new Date().getSeconds());
});

blynk.on('connect', function() { console.log("Blynk ready."); });
blynk.on('disconnect', function() { console.log("DISCONNECT"); });

http.get(`http://blynk-cloud.com/${AUTH}/get/V5`, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

http.get(`http://blynk-cloud.com/${AUTH}/get/V6`, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

setInterval(()=>{
    http.get(`http://blynk-cloud.com/${AUTH}/get/V7`, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}, 1000);
