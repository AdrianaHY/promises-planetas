var express = require('express');
var app = express();
var path = require('path');
app.use("/data", express.static(__dirname + '/data'));
app.use("/static", express.static(__dirname + '/assets'));
app.use('/static', express.static(path.join(__dirname,'node_modules')));

app.get('/', (req,res) => {
  res.sendFile(__dirname + "/index.html")
});

app.listen(8080);
