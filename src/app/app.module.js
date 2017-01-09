"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var app_routes_1 = require("./app.routes");
var common_1 = require("@angular/common");
var app_1 = require("./app");
var home_1 = require("./home/home");
var story_component_1 = require("./story/story.component");
var dashboard_1 = require("./dashboard/dashboard");
var keysTransform_pipe_1 = require("./global/keysTransform.pipe");
var scriptbuilder_component_1 = require("./scriptbuilder/scriptbuilder.component");
var header_1 = require("./header/header");
var footer_1 = require("./footer/footer");
var story_service_1 = require("./story/story.service");
var makeDroppable_directive_1 = require("./dashboard/makeDroppable.directive");
var makeDraggable_directive_1 = require("./dashboard/makeDraggable.directive");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routes_1.routing, http_1.HttpModule],
        declarations: [app_1.App, home_1.Home, story_component_1.Story, dashboard_1.Dashboard, scriptbuilder_component_1.ScriptBuilder, header_1.Header, footer_1.Footer, makeDraggable_directive_1.MakeDraggable, makeDroppable_directive_1.MakeDroppable, keysTransform_pipe_1.KeysPipe],
        bootstrap: [app_1.App],
        providers: [story_service_1.StoryService, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }] // services
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map