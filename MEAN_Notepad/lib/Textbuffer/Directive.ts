/// <reference path="../../node_modules/definitely-typed-angular/angular.d.ts" />

class TextStats implements ng.IDirective
{
    restrict: string = 'E';
    parentText: string;


    link = (scope: ng.IScope, el: HTMLElement, attrs) =>
    {
        this.parentText = attrs.parentModel;
        if (!(this.parentText in scope))
        { scope[this.parentText] = ''; }

        let updateFunction = (scope, el, attrs) =>
        {
            let fullText: string = scope.$eval(this.parentText) as string || '';
            if (fullText == '') {
                scope.wordCount = 0;
            } else {
                scope.wordCount = fullText.trim().split(/\s+/).length;
            }
            scope.charCount = fullText.length;        
        }
       
        //add watch
        scope.$watch(this.parentText, function () {
            updateFunction(scope, el, attrs);
        });
    }
    template = `<div style="background-color:darkgrey; width:95%">Characters:{{charCount}}    Words:{{wordCount}}</div>`;
    

    static factory(): ng.IDirectiveFactory
    {
        const directive: ng.IDirectiveFactory = () => new TextStats();
        return directive;
    }
    
}
angular.module('notepadApp').directive('npTextStats', TextStats.factory());