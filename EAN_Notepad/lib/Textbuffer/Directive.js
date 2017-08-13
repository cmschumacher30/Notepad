"use strict";
/// <reference path="../../node_modules/definitely-typed-angular/angular.d.ts" />
var TextStats = (function () {
    function TextStats() {
        var _this = this;
        this.restrict = 'E';
        this.link = function (scope, el, attrs) {
            _this.parentText = attrs.parentModel;
            if (!(_this.parentText in scope)) {
                scope[_this.parentText] = '';
            }
            var updateFunction = function (scope, el, attrs) {
                var fullText = scope.$eval(_this.parentText) || '';
                if (fullText == '') {
                    scope.wordCount = 0;
                }
                else {
                    scope.wordCount = fullText.trim().split(/\s+/).length;
                }
                scope.charCount = fullText.length;
            };
            //add watch
            scope.$watch(_this.parentText, function () {
                updateFunction(scope, el, attrs);
            });
        };
        this.template = "<div style=\"background-color:darkgrey; width:95%\">Characters:{{charCount}}    Words:{{wordCount}}</div>";
    }
    TextStats.factory = function () {
        var directive = function () { return new TextStats(); };
        return directive;
    };
    return TextStats;
}());
angular.module('notepadApp').directive('npTextStats', TextStats.factory());
