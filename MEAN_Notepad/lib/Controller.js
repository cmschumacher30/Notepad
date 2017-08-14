"use strict";
/// <reference types="../node_modules/@types/angular/" />
var NotepadController = (function () {
    function NotepadController(DocBuffer, $scope) {
        this.mode = 'pad';
        this.modeChange = function () {
            if (this.mode === 'pad') {
                this.mode = 'file';
                window.location.href = '#!file';
            }
            else {
                this.mode = 'pad';
                window.location.href = '#!';
                this.fileName = this.getName();
            }
        };
        this.saveFile = function () {
            if (typeof this.fileName == 'undefined' || this.filenName === '') {
                window.alert("Please enter a file name.");
            }
            else {
                this.saveData();
            }
        };
        this.newFile = function () {
            this.clear();
        };
        this.nameChange = function () {
            this.setName(this.fileName);
        };
        this.localScope = $scope;
        this.getName = function () { return DocBuffer.getName(); };
        this.getBuffer = function () { return DocBuffer.getBuffer(); };
        this.setName = function (name) { DocBuffer.setName(name); };
        this.setBuffer = function (buff) { DocBuffer.setBuffer(buff); };
        this.clear = function () { return DocBuffer.clear(); };
        this.saveData = function () { return DocBuffer.saveData(); };
        var self = this;
        $scope.$watch(this.getName, function () {
            self.fileName = self.getName();
        });
    }
    return NotepadController;
}());
angular.module('notepadApp')
    .controller('MainCtrl', ['DocBuffer', '$scope', NotepadController]);
