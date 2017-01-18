"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var StoryService = (function () {
    // Resolve HTTP using the constructor
    function StoryService(http) {
        this.http = http;
        this.updateDialogue = function (i, j, dialogue) {
            console.log(i + ", " + j);
            var newI;
            if (this.scriptTransitionIndex) {
                i = this.scriptTransitionIndex;
                this.scriptTransitionIndex = undefined;
            }
            console.log(this.storyScript);
            this.storyScript[i][j]["speech"] = dialogue;
        };
        this.deleteDialogue = function (i, j) {
            if (this.storyScript[i].length > 1) {
                this.storyScript[i].splice(j, 1);
            }
            else {
                this.storyScript.splice(i, 1);
            }
        };
        this.addDialogue = function (mode) {
            if (mode == "horizontal") {
                console.log(this.storyScript);
                var lastIndex, lastText;
                this.storyScript[this.storyScript.length - 1].forEach(function (e, i) {
                    if (e.actor == "boy_1") {
                        lastIndex = i;
                        lastText = e.speech;
                    }
                });
                if (!isNaN(lastIndex)) {
                    this.storyScript[this.storyScript.length - 1].splice(lastIndex, 1);
                    this.storyScript[this.storyScript.length - 1].push({ "actor": "boy_1", "speech": lastText + "\nHi" });
                }
                else {
                    this.storyScript[this.storyScript.length - 1].push({ "actor": "boy_1", "speech": "Hi" });
                }
            }
            else if (mode == "vertical") {
                this.storyScript.push([{ "actor": "boy_1", "speech": "Hi" }]);
            }
        };
        /*this.storyScript=[{
            "boy_1":"Hello World_1",
            "girl_1":"Hello World_2"
        },{
            "boy_1":"Hello World_3"
        }
        ]*/
        this.storyScript = [
            [
                { "actor": "boy_1", "speech": "Hello World_11" },
                { "actor": "girl_1", "speech": "Hello World_22" }
            ],
            [
                { "actor": "boy_1", "speech": "Hello World_33" }
            ]
        ];
    }
    StoryService.prototype.getStories = function () {
        // ...using get request
        return this.http.get('/stories')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StoryService.prototype.getStory = function (storyid) {
        // ...using get request
        return this.http.get("/story/" + storyid)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StoryService.prototype.publishStory = function (story) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(story);
        return this.http.post('/stories', body, options).map(function (res) { return res.json(); });
    };
    StoryService.prototype.ngOnInit = function () {
        //console.log(this.params)
    };
    return StoryService;
}());
StoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map