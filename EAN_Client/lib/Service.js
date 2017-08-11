"use strict";
function CurrentBuffer($http) {
    var name;
    var buffer;
    var endpoint = 'http://localhost:64082/api/Document';
    this.clear = function () {
        name = '';
        buffer = '';
    };
    this.getName = function () { return name; };
    this.getBuffer = function () { return buffer; };
    this.setName = function (arg) { name = arg; };
    this.setBuffer = function (arg) {
        buffer = arg;
    };
    this.saveData = function () {
        var data = JSON.stringify(buffer);
        $http.put(endpoint + '/' + name, data);
    };
}
angular.module('notepadApp').service('DocBuffer', ['$http', CurrentBuffer]);
