angular.module('notepadApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/Textbuffer/pad.html',
            controller: 'TextBufferCtrl as textCtrl'
        })
            .when('/file', {
            templateUrl: '/Filesystem/filelist.html',
            controller: 'FilesystemCtrl as fileCtrl'
        })
            .otherwise({ redirectTo: '/' });
    }
]);
//# sourceMappingURL=RouteConfig.js.map