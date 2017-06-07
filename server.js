var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

var router = express.Router();
var cors=require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');


router.get('/leaderboard', function (req, res) {
  db.all('SELECT * FROM player', function (err, row) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(row);
  })
});

router.post('/game', function (req, res) {
  console.log('New request received: ')
  console.log(req.body);
  var username = req.body.username;
  var points = req.body.points;
  var time = req.body.time;
  db.run("INSERT INTO player VALUES (?, ?,?)", [username, points, time]);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json("");
});

// INIT API
app.use('/', router)

app.listen(port);
