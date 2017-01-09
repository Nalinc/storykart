"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require("@angular/router");
var story_service_1 = require("../story/story.service");
var story_component_1 = require("../story/story.component");
var Dashboard = (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(storyService, route, router) {
        var _this = _super.call(this, storyService, route, router) || this;
        _this.storyService = storyService;
        _this.route = route;
        _this.router = router;
        _this.storyTitle = "";
        _this.storyAuthor = "Anonymous";
        _this.storyAuthorEmail = "";
        _this.active = 'avatars';
        _this.counter = 0;
        _this.storyMode = "paused";
        _this.errScript = false;
        _this.initScript = "boy_1: Hi, I am the first actor in your story\nboy_1: You can select other actors from panel aside..\nboy_1: and create your own script\nboy_1: Hover over the actor/object to know it's name";
        _this.storyScript = _this.initScript.split('\n');
        _this.sprites = {
            avatars: [
                { "name": "boy_1", "selected": "" },
                { "name": "boy_2", "selected": "" },
                { "name": "boy_3", "selected": "" },
                { "name": "boy_4", "selected": "" },
                { "name": "boy_5", "selected": "" },
                { "name": "man_1", "selected": "" },
                { "name": "man_2", "selected": "" },
                { "name": "girl_1", "selected": "" },
                { "name": "girl_2", "selected": "" },
                { "name": "girl_3", "selected": "" },
                { "name": "girl_4", "selected": "" },
                { "name": "girl_5", "selected": "" },
                { "name": "woman_1", "selected": "" },
                { "name": "woman_2", "selected": "" }
            ],
            objects: [
                { "name": "dog", "selected": "" },
                { "name": "tree_1", "selected": "" },
                { "name": "sun", "selected": "" }
            ]
        };
        _this.onDrop = function (ev) {
            /* The default handling is not to process a drop action and hand it to the next
               higher html element in your DOM. */
            /* Here, we prevent the default behaviour in order to process the event within
               this handler and to stop further propagation of the event. */
            ev.preventDefault();
            /* In the drag event, we set the *variable* (it is not a variable name but a
               format, please check the reference!) "text/html", now we read it out */
            var data = ev.dataTransfer.getData("text");
            if (ev.target == jQuery(".add-more-actors")[0]) {
                jQuery('.story-box #' + data).remove();
                jQuery('.story-board, .story-actors').removeClass('highlight');
                jQuery('.add-more-actors').attr('src', '/images/add.svg').css({ "border": "1px dashed #a9a9a9" });
                return;
            }
            else if (jQuery(ev.target).hasClass('actor') || !data)
                return;
            /* As we put the ID of the source element into this variable, we can now use
               this ID to manipulate the dragged element as we wish. */
            /* Let's just move it through the DOM and append it here */
            var ele = jQuery('.story-box #' + data);
            ele.css({ "top": ev.offsetY - 35, "left": ev.offsetX - 35 });
            jQuery(ev.target).append(ele);
        };
        _this.onReset = function () {
            this.storyScript = "";
            var _id = new Date().getTime();
            jQuery('#script-area').val("");
            jQuery('.story-board .actor').remove();
            jQuery('.story-actors .actor').remove();
            var avatars = ["boy_1", "girl_1", "man_1"];
            for (var i in avatars) {
                var ele = jQuery("<img />", {
                    "src": 'sprites/' + avatars[i] + '.svg',
                    "name": avatars[i],
                    "class": "actor",
                    "id": _id - parseInt(i)
                });
                jQuery('.story-actors').append(ele);
            }
            jQuery("#speech").html("").hide();
        };
        _this.showModal = function (type) {
            if (type == 'import') {
                this.modalType = 'import';
                this.sprites = {
                    avatars: [
                        { "name": "boy_1", "selected": "" },
                        { "name": "boy_2", "selected": "" },
                        { "name": "boy_3", "selected": "" },
                        { "name": "boy_4", "selected": "" },
                        { "name": "boy_5", "selected": "" },
                        { "name": "man_1", "selected": "" },
                        { "name": "man_2", "selected": "" },
                        { "name": "girl_1", "selected": "" },
                        { "name": "girl_2", "selected": "" },
                        { "name": "girl_3", "selected": "" },
                        { "name": "girl_4", "selected": "" },
                        { "name": "girl_5", "selected": "" },
                        { "name": "woman_1", "selected": "" },
                        { "name": "woman_2", "selected": "" }
                    ],
                    objects: [
                        { "name": "dog", "selected": "" },
                        { "name": "tree_1", "selected": "" },
                        { "name": "sun", "selected": "" }
                    ]
                };
            }
            else if (type == 'publish') {
                this.modalType = 'publish';
                var that = this;
                this.storyJSON = { "title": this.storyTitle,
                    "author": this.storyAuthor,
                    "email": this.storyAuthorEmail,
                    "stars": "0",
                    "timestamp": new Date().getTime(),
                    "visibility": "public",
                    "background": this.storyBackground,
                    "actors": [],
                    "script": this.storyScript
                };
                jQuery('.story-board').children('.actor').each(function () {
                    that.storyJSON.actors.push({
                        "name": this.name,
                        "left": this.style.left,
                        "top": this.style.top,
                        "url": this.src
                    });
                });
            }
            else if (type == 'background') {
                this.modalType = 'background';
                this.bgs = ['classroom_1', 'classroom_2', 'desert_1', 'desert_2',
                    'jungle_1', 'jungle_2', 'night_1', 'night_2', 'road_1',
                    'road_2', 'stage_1', 'stage_2'];
            }
            jQuery("#myModal").css({ "display": "block" });
        };
        _this.hideModal = function () {
            jQuery("#myModal").css({ "display": "none" });
        };
        _this.importAvatars = function () {
            var _id = new Date().getTime();
            for (var i in this.sprites.avatars) {
                if (this.sprites.avatars[i].selected) {
                    var eleActor = jQuery("<img />", {
                        "src": 'sprites/' + this.sprites.avatars[i].name + '.svg',
                        "class": "actor",
                        "id": _id + parseInt(i),
                        "title": this.sprites.avatars[i].name,
                        "name": this.sprites.avatars[i].name
                    });
                    jQuery('.story-actors').append(eleActor);
                }
            }
            for (var i in this.sprites.objects) {
                if (this.sprites.objects[i].selected) {
                    var eleObj = jQuery("<img />", {
                        "src": 'sprites/' + this.sprites.objects[i].name + '.svg',
                        "class": "actor",
                        "id": _id - parseInt(i) - 1,
                        "title": this.sprites.objects[i].name,
                        "name": this.sprites.objects[i].name
                    });
                    jQuery('.story-actors').append(eleObj);
                }
            }
            this.hideModal();
        };
        _this.compileScript = function (val) {
            var that = this;
            this.errScript = false;
            var pattern = /\w+[\w\s]*:\s*\w+[\w\s]*/g;
            var scriptArray = val.split('\n')
                .filter(function (o) { return o; })
                .map(function (o) { return o.trim(); });
            if (scriptArray.length != val.match(/:/g).length)
                this.errScript = true;
            scriptArray.forEach(function (dialog) {
                if (!dialog.match(pattern))
                    that.errScript = true;
            });
            if (!this.errScript) {
                this.storyScript = scriptArray;
            }
            return this.storyScript;
        };
        _this.publishStory = function () {
            var _this = this;
            console.log(this.storyJSON);
            this.storyService.publishStory(this.storyJSON).subscribe(function (data) {
                // refresh the list
                console.log(data);
                _this.router.navigate(['/story', data.story._id]);
                return true;
            }, function (error) {
                console.error("Error saving food!");
            });
        };
        window.onresize = function () {
            //	jQuery('.story-controller').css({'margin-left':jQuery('.story-board').position().left});
        };
        return _this;
    }
    Dashboard.prototype.ngAfterViewInit = function () {
        jQuery("textarea").attr('placeholder', this.initScript);
        //jQuery('.story-controller').css({'margin-left':jQuery('.story-board').position().left+125});
    };
    return Dashboard;
}(story_component_1.Story));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dashboard.prototype, "storyTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dashboard.prototype, "storyAuthor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dashboard.prototype, "storyAuthorEmail", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyJSON", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyPlay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyReset", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyPause", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyStepNext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyStepPrev", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "timer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "counter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyScript", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dashboard.prototype, "storyBackground", void 0);
Dashboard = __decorate([
    core_1.Component({
        selector: '[dashboard]',
        host: {
            class: 'dashboard-page'
        },
        template: require('./dashboard.html')
    }),
    __metadata("design:paramtypes", [story_service_1.StoryService, router_1.ActivatedRoute, router_1.Router])
], Dashboard);
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.js.map