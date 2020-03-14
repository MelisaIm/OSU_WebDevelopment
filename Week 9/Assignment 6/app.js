
const express = require('express');
const mysql = require('./dbconfig.js');

const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/reset-table',function(req,res,next){
	var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
	  var createString = "CREATE TABLE todo(" +
	  "id INT PRIMARY KEY AUTO_INCREMENT," +
	  "name VARCHAR(255) NOT NULL," +
	  "done BOOLEAN," +
	  "due DATE)";
	  mysql.pool.query(createString, function(err){
		context.results = "Table reset";
		res.render('home',context);
	  })
	});
});

app.get('/insert',function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
	  if(err){
		next(err);
		return;
	  }
	  context.results = "Inserted id " + result.insertId;
	  res.render('home',context);
	});
});

app.get('/',function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
	  if(err){
		next(err);
		return;
	  }
	  context.results = JSON.stringify(rows);
	  res.render('home', context);
	});
});

app.get('/simple-update',function(req,res,next){
	var context = {};
	mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
	  [req.query.name, req.query.done, req.query.due, req.query.id],
	  function(err, result){
	  if(err){
		next(err);
		return;
	  }
	  context.results = "Updated " + result.changedRows + " rows.";
	  res.render('home',context);
	});
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});