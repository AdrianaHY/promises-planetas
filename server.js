var express = require('express');
var app = express();

app.use("/data", express.static(__dirname + '/data'));
app.use("/static", express.static(__dirname + '/assets'));

app.get('/', (req,res) => {
  res.sendFile(__dirname + "/index.html")
});

app.listen(8080);
