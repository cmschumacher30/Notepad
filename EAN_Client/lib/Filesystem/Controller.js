"use strict";
var DocumentRecord = (function () {
    function DocumentRecord(argName, argLink) {
        this.name = argName;
        this.link = argLink;
    }
    return DocumentRecord;
}());
var FilesystemController = (function () {
    function FilesystemController($http, docBuffer, $scope) {
        this.docs = [];
        this.endpoint = 'http://localhost:64082/api/Document';
        this.docClick = function (name, link) {
            var self = this;
            //move file load into service???
            self.httpHandle.get(link).then(function (response) {
                self.buffer.setBuffer(response.data.toString());
                self.buffer.setName(name);
                window.location.href = '#!';
            }, function (errorResponse) {
                console.log(errorResponse);
            });
        };
        this.deleteClick = function (name, link) {
            var self = this;
            this.httpHandle.delete(link);
            this.docs = this.docs.filter(function (x) { return x.name != name; });
            self.localScope.$digest();
        };
        this.cancelClick = function () {
            window.location.href = '#!';
        };
        var self = this;
        self.localScope = $scope;
        self.httpHandle = $http;
        self.buffer = docBuffer;
        self.httpHandle.get(self.endpoint).then(function (response) {
            for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                var cur = _a[_i];
                self.docs.push(new DocumentRecord(cur, self.endpoint + "/" + cur));
            }
        }, function (errorResponse) {
            console.log(errorResponse);
        });
    }
    return FilesystemController;
}());
angular.module('notepadApp')
    .controller('FilesystemCtrl', ['$http', 'DocBuffer', '$scope', FilesystemController]);
