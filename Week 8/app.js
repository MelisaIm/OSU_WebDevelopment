const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const session = require('express-session');
const bodyParser = require('body-parser');
var request = require('request');
const credentials = require('./credentials');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'verySecretSecretiveSecret'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res,next){
	var context = {};
	//If there is no session, go to the main page.
	if(!req.session.name){
	  res.render('newSession', context);
	  return;
	}

	context.name = req.session.name;
	context.toDoCount = req.session.toDo.length || 0;
	context.toDo = req.session.toDo || [];
	console.log(context.toDo);
	res.render('toDo',context);
  });

app.post('/',function(req, res, next){
	var context = {};
  
	if(req.body['New List']){
	  req.session.name = req.body.name;
	  req.session.toDo = [];
	  req.session.curId = 0;
	}
  
	//If there is no session, go to the main page.
	if(!req.session.name){
	  res.render('newSession', context);
	  return;
	}
  
	if(req.body['Add Item']){
	  req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
	  req.session.curId++;
	}
  
	if(req.body['Done']){
	  req.session.toDo = req.session.toDo.filter(function(e){
		return e.id != req.body.id;
	  })
	}


function KtoF(kelvins) {
	return Math.round(kelvins * (9/5) - 459.67);
}

	request('http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=' + credentials.owmKey, function(err, response, body){
		if(!err && response.statusCode < 400){
			console.log(body.weather);
			console.log(typeof body);
		  context.owm = body;
		//   context.temp = KtoF(body.weather.main.temp);
		} else {
		  if(response){
			console.log(response.statusCode);
		  }
		  next(err);
		}
	  });
	  console.log(context.temp);
	context.name = req.session.name;
	context.toDoCount = req.session.toDo.length;
	context.toDo = req.session.toDo;
	console.log(context.toDo);
	res.render('toDo',context);
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});