class TextBufferController implements ng.IController
{
    buffer: string = '';
    getName;
    getBuffer;
    setName;
    setBuffer;
    clear;   
    constructor(DocBuffer, $scope) {
        var self = this;
        self.buffer = DocBuffer.getBuffer();

        self.getName = function () { return DocBuffer.getName(); }
        self.getBuffer = function () { return DocBuffer.getBuffer(); }
        self.setName = function (name: string) { DocBuffer.setName(name); }
        self.setBuffer = function (buff: string) { DocBuffer.setBuffer(buff); }
        self.clear = function () { return DocBuffer.clear(); }


        $scope.$watch(this.getBuffer, function () {            
            self.buffer = self.getBuffer();            
        });
        
    }   

    write = function () {
        this.setBuffer(this.buffer);       
    }


}

angular.module('notepadApp')
    .controller('TextBufferCtrl', ['DocBuffer','$scope',TextBufferController]);