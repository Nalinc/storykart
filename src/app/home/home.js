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
var story_service_1 = require("../story/story.service");
var Home = (function () {
    function Home(storyService) {
        this.storyService = storyService;
        this.names = ["one", "two", "three"];
    }
    Home.prototype.ngOnInit = function () {
        // Load stories
        this.loadStories();
    };
    Home.prototype.loadStories = function () {
        var _this = this;
        // Get all stories
        this.storyService.getStories()
            .subscribe(function (response) { return _this.stories = response['stories']; }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    return Home;
}());
Home = __decorate([
    core_1.Component({
        selector: '[home]',
        host: {
            class: 'home-page'
        },
        template: require('./home.html')
    }),
    __metadata("design:paramtypes", [story_service_1.StoryService])
], Home);
exports.Home = Home;
//# sourceMappingURL=home.js.map