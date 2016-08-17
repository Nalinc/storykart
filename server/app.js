var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/',function(req, res){
	res.render("index")
})

module.exports = app;