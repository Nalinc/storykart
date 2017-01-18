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
require('jquery-ui/sortable');
var ScriptBuilder = (function () {
    function ScriptBuilder(ref, storyInstance) {
        this.ref = ref;
        this.storyInstance = storyInstance;
        this.removeMode = false;
        this.addMode = false;
        this.storyScript = storyInstance.storyScript;
        jQuery(document).on("click", ".script-builder", function (event) {
            if (event.target.className != "scriptActor")
                jQuery(".multiple-select-wrapper .list").hide();
        });
        this.updateDialogue = function (ev, i, j) {
            storyInstance.updateDialogue(i, j, ev.target.value);
        };
        this.deleteDialogue = function (i, j) {
            storyInstance.deleteDialogue(i, j);
        };
        this.addDialogue = function (mode) {
            var _this = this;
            storyInstance.addDialogue(mode);
            setTimeout(function () {
                _this.initiateSortable();
            });
        };
        this.initiateSortable = function () {
            this.jigsawArray = jQuery(".jigsawContainer .jigsaw");
            jQuery(this.jigsawArray).sortable({
                connectWith: ".jigsaw",
                stop: function (ev, elem) {
                    var actorName = elem.item[0].getAttribute("data-name");
                    var sourceIndex = jQuery(ev.target).index();
                    var sourceRelativeIndex;
                    var destinationIndex = jQuery(elem.item[0].parentNode).index();
                    var destinationRelativeIndex = jQuery(elem.item[0]).index();
                    var text = "";
                    storyInstance.storyScript[sourceIndex].forEach(function (e, i) {
                        if (e.actor == actorName) {
                            sourceRelativeIndex = i;
                        }
                    });
                    if (sourceIndex == destinationIndex) {
                        if (sourceRelativeIndex == destinationRelativeIndex)
                            return;
                        var tem = storyInstance.storyScript[sourceIndex][sourceRelativeIndex];
                        storyInstance.storyScript[sourceIndex].splice(sourceRelativeIndex, 1);
                        storyInstance.storyScript[destinationRelativeIndex].splice(destinationRelativeIndex, 0, tem);
                    }
                    else {
                        var lastIndex, lastText;
                        var temp = storyInstance.storyScript[sourceIndex][sourceRelativeIndex];
                        storyInstance.storyScript[destinationIndex].forEach(function (e, i) {
                            if (e.actor == actorName) {
                                lastIndex = i;
                                lastText = e.speech + "\n";
                            }
                        });
                        if (!isNaN(lastIndex)) {
                            storyInstance.storyScript[destinationIndex].splice(lastIndex, 1);
                            storyInstance.storyScript[destinationIndex].splice(lastIndex, 0, { "actor": actorName, "speech": lastText + temp.speech });
                            var existingElem = jQuery('.jigsawContainer .jigsaw:nth-child(' + (destinationIndex + 1) + ') .parallel:nth-child(' + (lastIndex + 1) + ')');
                            existingElem.find("textarea").val(lastText + temp.speech);
                        }
                        else {
                            storyInstance.storyScript[destinationIndex].splice(destinationRelativeIndex, 0, temp);
                        }
                        storyInstance.storyScript[sourceIndex].splice(sourceRelativeIndex, 1);
                        storyInstance.scriptTransitionIndex = destinationIndex;
                        if (storyInstance.storyScript[sourceIndex].length == 0) {
                            jQuery('.jigsawContainer .jigsaw:nth-child(' + (sourceIndex + 1) + ')').remove();
                            storyInstance.storyScript.splice(sourceIndex, 1);
                        }
                    }
                    jQuery(elem.item[0]).remove();
                    jQuery("#refreshView").trigger("click");
                }
            });
        };
        this.toggleList = function (actorsList, jigsaw) {
            var actorsOnBoard = Array.from(jQuery('.story-board img')
                .map(function (a, o) { return o.attributes.name.value; }));
            var existingActors = new Set(Array.from(jQuery(jigsaw).find('.parallel')
                .map(function (a, o) { return o.attributes['data-name'].value; })));
            this.availableActors = actorsOnBoard.slice().filter(function (x) { return !existingActors.has(x); });
            if (this.availableActors.length > 0)
                jQuery(actorsList).toggle();
        };
        this.changeActor = function (selectedActor, actorsList, i, j) {
            var temp = storyInstance.storyScript[i][j];
            temp["actor"] = selectedActor;
            storyInstance.storyScript[i].splice(j, 1);
            storyInstance.storyScript[i].splice(j, 0, temp);
            jQuery(actorsList).toggle();
        };
        function move(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing purposes
        }
        ;
    }
    ScriptBuilder.prototype.ngAfterViewInit = function () {
        this.initiateSortable();
    };
    return ScriptBuilder;
}());
ScriptBuilder = __decorate([
    core_1.Component({
        selector: 'scriptbuilder',
        template: require('./scriptbuilder.html'),
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [core_1.ApplicationRef, story_service_1.StoryService])
], ScriptBuilder);
exports.ScriptBuilder = ScriptBuilder;
//# sourceMappingURL=scriptbuilder.component.js.map