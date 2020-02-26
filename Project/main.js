const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use("/public", express.static(path.join(__dirname, 'public'))); 

app.get('/',function(req,res){
	const qParams = [];

	for (let p in req.query) {
		qParams.push({'name':p,'value':req.query[p]});
	}

	const context = {};
	context.dataList = qParams;
	res.render('home', context);
});

app.get('/journal', (req, res) => {
	res.render('journal');
});

app.get('/templates', (req, res) => {
	res.render('templates');
});

app.get('/how-to', (req, res) => {
	res.render('how-to');
});

app.get('/templates/tracker-blank', (req, res) => {
	res.render('tracker-print');
});

app.get('/templates/journal-blank', (req, res) => {
	res.render('journal-print');
});

// app.post('/', function(req,res){
// 	const qParams = [];
// 	for (let p in req.body){
// 		qParams.push({'name':p,'value':req.body[p]});
// 	}

// 	for (let p in req.query) {
// 		qParams.push({'name':p,'value':req.query[p]});
// 	}

// 	const context = {};
// 	context.dataList = qParams;
// 	res.render('post', context);
//   });

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
