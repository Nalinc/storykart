var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var fs = require('fs');

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

module.exports = app;