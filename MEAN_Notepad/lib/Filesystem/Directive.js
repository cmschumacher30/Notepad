"use strict";
var VerifyButton = (function () {
    function VerifyButton() {
        this.restrict = 'A';
        this.priority = 1;
        this.terminal = true;
        this.scope = true;
        this.link = function (scope, el, attrs) {
            var self = scope;
            self.clickedOnce = false;
            self.childElements = el.html();
            self.originalClick = attrs.ngClick;
            el.bind('click', function () {
                if (self.clickedOnce == false) {
                    el.empty();
                    el.html('Really?');
                    self.clickedOnce = true;
                }
                else {
                    self.clickedOnce = false;
                    el.empty();
                    el.html(self.childElements);
                    scope.$eval(self.originalClick);
                }
            });
        };
    }
    return VerifyButton;
}());
angular.module('notepadApp').directive('verifyButton', function () { return new VerifyButton; });
