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
var router_1 = require("@angular/router");
var Header = (function () {
    function Header(router) {
        this.router = router;
        this.mode = "maximized";
    }
    Header.prototype.shrinkHeader = function (event) {
        if (this.mode != "hide-header") {
            var scrollAmt = jQuery(document).scrollTop();
            if (scrollAmt > 50) {
                jQuery('header, .page-wrap').addClass('scrolled');
                this.mode = "minified";
            }
            else {
                jQuery('header, .page-wrap').removeClass('scrolled');
                this.mode = "maximized";
            }
        }
    };
    ;
    Header.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (event.url == "/") {
                    jQuery(document).scrollTop(0);
                    jQuery('header, .page-wrap').removeClass('scrolled');
                    _this.mode = "maximized";
                }
                else {
                    jQuery('header, .page-wrap').addClass('scrolled');
                    _this.mode = "hide-header";
                }
            }
        });
    };
    return Header;
}());
__decorate([
    core_1.HostListener('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Header.prototype, "shrinkHeader", null);
Header = __decorate([
    core_1.Component({
        selector: 'app-header',
        template: require('./header.html')
    }),
    __metadata("design:paramtypes", [router_1.Router])
], Header);
exports.Header = Header;
//# sourceMappingURL=header.js.map