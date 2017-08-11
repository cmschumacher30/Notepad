function CurrentBuffer($http : ng.IHttpService) {
    var name: string;
    var buffer: string;
    var endpoint: string = 'http://localhost:64082/api/Document';

    this.clear = function () {
        name = '';
        buffer = '';
    }
    this.getName = function () { return name; }
    this.getBuffer = function () { return buffer; }
    this.setName = function (arg: string) { name = arg; }
    this.setBuffer = function (arg: string) {
        buffer = arg;
    }

    this.saveData = function ()
    {
        var data = JSON.stringify(buffer);
        $http.put(endpoint + '/' + name, data);
    }
    
}

angular.module('notepadApp').service('DocBuffer', ['$http',CurrentBuffer]);
