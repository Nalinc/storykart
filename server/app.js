var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var app = express();
var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views/'));

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

// Support JSON-encoded request bodies
app.use(bodyParser.json({
    limit: '5mb'
}));

// Support URL-encoded request bodies     
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.get('/',function(req, res){
	res.render("index")
})

app.get('/stories',function(req,res){
	var obj = JSON.parse(fs.readFileSync(__dirname + '/api/stories.json', 'utf8'));
	res.send(obj)
})

app.post('/stories',function(req,res){
	console.log(req.body.title)
	var obj = {"success":true,"code":"200"}
	res.send(obj)
})

module.exports = app;