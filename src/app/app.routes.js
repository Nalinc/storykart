"use strict";
var router_1 = require("@angular/router");
var home_1 = require("./home/home");
var dashboard_1 = require("./dashboard/dashboard");
var story_component_1 = require("./story/story.component");
var appRoutes = [
    {
        path: 'home',
        component: home_1.Home,
        data: {
            title: 'Home page'
        }
    },
    {
        path: 'dashboard',
        component: dashboard_1.Dashboard,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'story/:id',
        component: story_component_1.Story,
        data: {
            title: 'View Story'
        }
    },
    {
        path: '',
        component: home_1.Home
    },
    { path: '**', component: home_1.Home }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map