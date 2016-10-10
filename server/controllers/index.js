//Load the annotation module
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var env = process.env.NODE_ENV || 'development';
var options = {};
//Application options
if( env == "development")
    options = require('../options');
var mongoDBURL =  process.env.MONGODB_URI || options.mongodb;


var Schema = mongoose.Schema;

// create a schema
var storySchema = new Schema({
    id: String,
    title: String,
    author: String,
    email: String,
    stars: String,
    timestamp: String,
    visibility: String,
    actors: Array,
    script: Array
});
var Story = mongoose.model('story', storySchema);


var storyController = function() {

    this.init = function(db) {
        /* To remove the warning coming on server start. */
        mongoose.Promise = global.Promise;
        mongoose.connect(db);
        console.log("Connected to mongo instance: " + db);
    }

    this.create = function(req, res) {
        var response;
        var story = new Story(req.body);
        story.save(function (err, storyObj) {
            if (err) {
                console.log("Error in creating the story")
                response = {
                    "status" : "error",
                    "errorMessage" : err,
                    "code": 500
                };
                if(err.code) {
                    response.code = err.code + 500;
                }               
            } else {
                console.log("Successfully created a new story")
                response = {
                    "status" : "success",
                    "story" : storyObj
                }
            }
            res.send(response);
        });     
    }

    this.del = function(id, callback) {
        //TBD
    }
    this.find = function(req, res){

        Story.findById(req.params['storyid'], function (err, storyObj){
            if (err) {
                console.log("Error in fetching the story")
                response = {
                    "status" : "error",
                    "errorMessage" : err,
                    "code": 500
                };
                if(err.code) {
                    response.code = err.code + 500;
                }               
            } else {
                console.log("Successfully fetched a story")
                response = {
                    "status" : "success",
                    "story" : storyObj
                }
            }
            res.send(response);
        });
    }
    this.findAll = function(req, res){

        Story.find({"visibility": "public"}, function (err, storyObj){
            if (err) {
                console.log("Error in fetching the story")
                response = {
                    "status" : "error",
                    "errorMessage" : err,
                    "code": 500
                };
                if(err.code) {
                    response.code = err.code + 500;
                }               
            } else {
                console.log("Successfully fetched a story")
                response = {
                    "status" : "success",
                    "stories" : storyObj
                }
            }
            res.send(response);
        });
    }

    this.init(mongoDBURL)
}

module.exports = storyController;
