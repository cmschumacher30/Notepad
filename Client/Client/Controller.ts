class NotepadController implements ng.IController
{
    mode: string = 'pad';        
    localScope;
    getName;
    getBuffer;
    setName;
    setBuffer;
    clear;
    fileName;
    saveData;
    

    constructor(DocBuffer,$scope)
    {
        this.localScope = $scope;
        this.getName = function () { return DocBuffer.getName(); }
        this.getBuffer = function () { return DocBuffer.getBuffer(); }
        this.setName = function (name: string) { DocBuffer.setName(name); }
        this.setBuffer = function (buff: string) { DocBuffer.setBuffer(buff); }
        this.clear = function () { return DocBuffer.clear(); }
        this.saveData = function () { return DocBuffer.saveData(); }

        var self = this;
        $scope.$watch(this.getName, function () {
            self.fileName = self.getName();
        });

    }
    modeChange = function () {
        if (this.mode === 'pad') {
            this.mode = 'file';
            window.location.href = '#!file';

        } else {
            this.mode = 'pad';
            window.location.href = '#!';
            this.fileName = this.getName();
        }
    }

    saveFile = function () {
        if (typeof this.fileName == 'undefined' || this.filenName === '')
        {
            window.alert("Please enter a file name.");
        }
        else 
        {
            this.saveData();
        }
    }

    newFile = function () {       
        this.clear();
    }

    nameChange = function () {
        this.setName(this.fileName);
    }
}
angular.module('notepadApp')
    .controller('MainCtrl', ['DocBuffer','$scope',NotepadController]);