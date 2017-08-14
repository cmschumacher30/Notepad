"use strict";
/// <reference path="../node_modules/definitely-typed-angular/angular-route.d.ts" />
angular.module('notepadApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pad.html',
            controller: 'TextBufferCtrl as textCtrl'
        })
            .when('/file', {
            templateUrl: 'filelist.html',
            controller: 'FilesystemCtrl as fileCtrl'
        })
            .otherwise({ redirectTo: '/' });
    }
]);
