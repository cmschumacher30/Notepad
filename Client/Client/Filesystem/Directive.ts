class VerifyButton implements ng.IDirective {
    restrict: string = 'A';
    priority = 1;
    terminal = true;
    scope = true;

    link = function (scope: ng.IScope, el: ng.IAugmentedJQuery, attrs) {
        var self = scope;
        self.clickedOnce = false;
        self.childElements = el.html();
        self.originalClick = attrs.ngClick;
        el.bind('click', function () {
            if (self.clickedOnce == false) {
                el.empty();
                el.html('Really?');
                self.clickedOnce = true;
            } else {
                self.clickedOnce = false;
                el.empty();
                el.html(self.childElements);

                scope.$eval(self.originalClick);
            }

        });

    }
}
angular.module('notepadApp').directive('verifyButton', () => new VerifyButton);