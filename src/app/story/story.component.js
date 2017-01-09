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
var story_service_1 = require("./story.service");
var router_1 = require("@angular/router");
var Story = (function () {
    function Story(storyService, route, router) {
        this.storyService = storyService;
        this.route = route;
        this.router = router;
        this.storyTitle = "";
        this.storyAuthor = "Anonymous";
        this.storyAuthorEmail = "";
        this.storyBackground = "";
        this.counter = 0;
        this.storyMode = "paused";
        this.storyPlay = function (mode) {
            if (mode == "play") {
                this.storyMode = mode;
            }
            ;
            if (this.storyMode == "paused" && mode != "stepNext" && mode != "stepPrev") {
                clearTimeout(this.timer);
                return true;
            }
            if (this.storyScript.length <= this.counter) {
                this.storyReset();
                return true;
            }
            var estimatedTime = 2000;
            var actorName = this.storyScript[this.counter].substring(0, this.storyScript[this.counter].indexOf(":"));
            var positionClass, positionFix = jQuery('.story-board [name="' + actorName + '"]').position();
            var dialogue = this.storyScript[this.counter].substring(this.storyScript[this.counter].indexOf(":") + 1, this.storyScript[this.counter].length);
            //var actor = jQuery('.story-board [name="'+actorName+'"]');
            jQuery('.story-board [name="' + actorName + '"]').addClass("shake");
            //console.log(jQuery('.story-board [name="'+actorName+'"]'))
            if (dialogue.length > 30)
                estimatedTime = 4000;
            if (dialogue.length > 80)
                estimatedTime = 5000;
            // quadrant 1
            if (positionFix.top < 200 && positionFix.left > 300) {
                //positionFix.top = positionFix.top;
                positionFix.left -= 200;
                positionClass = "right-in";
            }
            else if (positionFix.top < 200 && positionFix.left < 300) {
                //positionFix.top = positionFix.top;
                positionFix.left += 80;
                positionClass = "left-in";
            }
            else if (positionFix.top > 200 && positionFix.left < 300) {
                //positionFix.top -= 100;
                positionFix.left += 80;
                positionClass = "left-in";
            }
            else if (positionFix.top > 200 && positionFix.left > 300) {
                //positionFix.top = positionFix.top;
                positionFix.left -= 200;
                positionClass = "right-in";
            }
            //jQuery('.story-board [name="'+actorName+'"]').removeClass("shake");
            jQuery("#speech").html(dialogue).css(positionFix)
                .removeClass("btm-left-in left-in right-in")
                .addClass(positionClass).show();
            if (this.storyScript[this.counter]) {
                if (mode != "stepNext" && mode != "stepPrev" && this.storyMode == 'play') {
                    var that = this;
                    this.timer = setTimeout(function () {
                        that.counter++;
                        jQuery('.story-board [name="' + actorName + '"]').removeClass("shake");
                        that.storyPlay();
                    }, estimatedTime);
                }
            }
            else {
                this.storyReset();
            }
            return true;
        };
        this.storyStepNext = function () {
            if (this.counter < this.storyScript.length) {
                console.log("next");
                this.storyPlay("stepNext");
                this.counter++;
            }
        };
        this.storyStepPrev = function () {
            if (this.counter > 0) {
                console.log("previous");
                this.counter--;
                this.storyPlay("stepPrev");
            }
        };
        this.storyReset = function () {
            this.counter = 0;
            this.storyMode = "paused";
            clearTimeout(this.timer);
            jQuery("#speech").html("").hide();
        };
    }
    Story.prototype.ngAfterViewInit = function () {
    };
    Story.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id']) {
                _this.loadStory(params['id']);
            }
        });
    };
    Story.prototype.loadStory = function (storyid) {
        var _this = this;
        // Get all story
        this.storyService.getStory(storyid)
            .subscribe(function (response) {
            _this.storyTitle = response['story'].title;
            _this.storyAuthor = response['story'].author;
            _this.storyAuthorEmail = response['story'].email;
            _this.storyScript = response['story'].script;
            _this.storyActors = response['story'].actors;
            _this.storyBackground = response['story'].background;
            for (var actor in _this.storyActors) {
                var eleObj = jQuery("<img />", {
                    "src": _this.storyActors[actor].url,
                    "class": "actor",
                    "title": _this.storyActors[actor].name,
                    "name": _this.storyActors[actor].name
                });
                eleObj.css({
                    "left": _this.storyActors[actor].left,
                    "top": _this.storyActors[actor].top
                });
                jQuery('.story-board').append(eleObj);
            }
        }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    return Story;
}());
Story = __decorate([
    core_1.Component({
        selector: '[story]',
        host: {
            class: 'story-page'
        },
        template: require('./story.html')
    }),
    __metadata("design:paramtypes", [story_service_1.StoryService, router_1.ActivatedRoute, router_1.Router])
], Story);
exports.Story = Story;
//# sourceMappingURL=story.component.js.map