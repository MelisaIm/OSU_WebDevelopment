
const express = require('express');
const mysql = require('./dbconfig.js');
const bodyParser = require('body-parser');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/reset-table',function(req,res,next){
	var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
	  var createString = "CREATE TABLE workouts (" +
	  "id INT PRIMARY KEY AUTO_INCREMENT," +
	  "name VARCHAR(255) NOT NULL," +
	  "reps INT," +
	  "weight INT," +
	  "unit VARCHAR(255)," +
	  "date DATE)";
	  mysql.pool.query(createString, function(err){
		context.results = "Table reset";
		res.render('home',context);
	  })
	});
});

app.get('/',function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
	  if(err){
		next(err);
		return;
	  }
	  rows.map((row, index) => {
		  row.number = index;
		  let day = new Date(row.date);
		  row.day = day.getUTCDate();
		  row.month = day.getUTCMonth();
		  row.year = day.getUTCFullYear();
		  console.log("MAP MONTH", row.month);
	  })
	  context.results = rows;
	  res.render('home', context);
	});
});

app.post('/', function (req,res,next) {
	if (req.body.event == "delete") {
		mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], (err, result) => {
			if(err) {
				console.log("DELETE ERROR: ", err);
				next(err);
				return;
			}
		});
	} else if (req.body.event == "edit") {
		const date = `${req.body.year}-${req.body.month + 1}-${req.body.day}`;
		mysql.pool.query("UPDATE workouts SET name=?, weight=?, reps=?, unit=?, date=? WHERE id=?",
			  [req.body.name, req.body.weight, req.body.reps, req.body.unit, date, req.body.id],
			  function(err, result){
			  if(err){
				next(err);
				return;
			  }
			//   context.results = "Updated " + result.changedRows + " rows.";
			  res.render('home',context);
			});
	} else {
		const date = `${req.body.year}-${req.body.month}-${req.body.day}`;
		console.log(date);
		var context = {};
		mysql.pool.query("INSERT INTO workouts (name, weight, reps, unit, date) VALUES (?,?,?,?,?)", [req.body.name, req.body.weight, req.body.reps, req.body.unit, date], function(err, result){
		  if(err){
			console.log("ERROR:", err);
			next(err);
			return;
		  }
		  context.results = "Inserted id " + result.insertId;
		  res.render('home',context);
		});
	}
});


app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});