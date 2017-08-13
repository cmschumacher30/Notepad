class DocumentRecord
{
    name: string;
    link: string;

    constructor(argName: string, argLink: string)
    {
        this.name = argName;
        this.link = argLink;
    }
}

class FilesystemController implements ng.IController
{   
    httpHandle: ng.IHttpService;
    docs: Array<DocumentRecord> = [];
    endpoint: string = '/api/Document';
    buffer : any;
    localScope: ng.IScope;

    constructor($http: ng.IHttpService, docBuffer : any, $scope : ng.IScope)
    {
        let self = this;
        self.localScope = $scope;
        self.httpHandle = $http;
        self.buffer = docBuffer;
        self.httpHandle.get(self.endpoint).then(
            function (response) 
            {
                for (let cur of (response.data as Array<string>))
                {
                    self.docs.push(new DocumentRecord(cur, `${self.endpoint}/${cur}`));
                }
            }, 
            function (errorResponse) 
            {
                console.log(errorResponse);
            });
    }

    docClick = function (name: string, link : string)
    {
        let self = this;
        //move file load into service???
        self.httpHandle.get(link).then(
            function (response : any) 
            {
                self.buffer.setBuffer(response.data.toString());
                self.buffer.setName(name);
                window.location.href = '#!';
            }, 
            function (errorResponse : any) 
            {
                console.log(errorResponse);
            });
    }

    deleteClick = function (name: string, link: string)
    {
        let self = this;
        this.httpHandle.delete(link);
        this.docs = this.docs.filter((x) => { return x.name != name; });
        self.localScope.$digest();
    }

    cancelClick = function ()
    {
        window.location.href = '#!';
    }


}

angular.module('notepadApp')
    .controller('FilesystemCtrl', ['$http', 'DocBuffer','$scope',FilesystemController]);