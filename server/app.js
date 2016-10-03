var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var exphbs  = require('express-handlebars');
var app = express();
var fs = require('fs');


app.use(compression());

// Support JSON-encoded request bodies
app.use(bodyParser.json());

// Support URL-encoded request bodies     
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views/'));

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/',function(req, res){
	res.render("index")
})

app.get('/stories',function(req,res){
	var obj = JSON.parse(fs.readFileSync(__dirname + '/api/stories.json', 'utf8'));
	res.send(obj)
})

app.post('/stories', function(req, res, next) {
	console.log(req.body)
	var obj = {"success":true,"code":"200"}
	res.send(obj)
});
module.exports = app;