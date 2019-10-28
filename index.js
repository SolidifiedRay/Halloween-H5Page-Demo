var express = require('express');
var app = express();
var path = require('path');
app.use(express.static("home"));
//viewed at http://localhost:8080
app.get('/', function(req, res){
res.sendFile(path.join(__dirname + '/home/index.html'));
});
app.use(express.static("src"));
app.get('/halloween-party', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(9000);