var mysql = require('mysql');
var express = require('express');
var config = require('../../config.js')
var bodyParser = require('body-parser');
var app = express()
var path = require('path');

var connectionConfig = {
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: "explore"
}

var con = mysql.createConnection(connectionConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/test', function(req,res){
	res.send("This is a response from Node");
});

app.get('/all', function(req, res) {
	
	var con = mysql.createConnection(connectionConfig);

	con.connect(function(err) {
		if (err) {
			console.log(err.code);
			throw err;
		}

		sql = 'SELECT * FROM users';
		con.query(sql, function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
	
});

app.post('/newUser', function(req, res) {
	var con = mysql.createConnection(connectionConfig);

	con.connect(function(err) {
		if (err) {
			console.log(err.code);
			throw err;
		}

		var episodeNumber = Number(req.body.episode);

		sql = `INSERT INTO users VALUES ('${req.body.user}', '${req.body.show}', ${episodeNumber})`;
		con.query(sql, function(err, result, fields) {
			if (err) throw err;
			res.send("1 record Inserted (Hit back and check the entries)");
		});
	});
	
})

app.get('/user', function(req, res) {
	var user = req.query.username;
	
	var con = mysql.createConnection(connectionConfig);

	con.connect(function(err) {
		if (err) {
			console.log(err.code);
			throw err;
		}

		sql = 'SELECT * FROM users WHERE username = ' + mysql.escape(user);
		con.query(sql, function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
});


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3100,function(){
  console.log("Started on PORT 3100");
});

